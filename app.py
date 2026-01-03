import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')

# MongoDB setup
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['ecommerce']
users = db.users
products = db.products
orders = db.orders



@app.route("/about")
def about():
    return render_template("aboutus.html")


def current_user():
    if 'user_id' in session:
        try:
            return users.find_one({'_id': ObjectId(session['user_id'])})
        except Exception:
            return None
    return None


@app.route('/')
def index():
    q = request.args.get('q', '').strip()
    query = {}
    if q:
        query = {'title': {'$regex': q, '$options': 'i'}}
    all_products = list(products.find(query))
    return render_template('index.html', products=all_products, q=q)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        role = request.form.get('role', 'client')
        if not username or not password:
            flash('Provide username and password', 'danger')
            return redirect(url_for('signup'))
        if users.find_one({'username': username}):
            flash('Username already exists', 'danger')
            return redirect(url_for('signup'))
        hashed = generate_password_hash(password)
        user_id = users.insert_one({'username': username, 'password': hashed, 'role': role}).inserted_id
        flash('Account created — please log in', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        user = users.find_one({'username': username})
        if not user or not check_password_hash(user['password'], password):
            flash('Invalid credentials', 'danger')
            return redirect(url_for('login'))
        session['user_id'] = str(user['_id'])
        session['username'] = user['username']
        session['role'] = user.get('role', 'client')
        flash('Logged in successfully', 'success')
        return redirect(url_for('index'))
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out', 'info')
    return redirect(url_for('index'))


@app.route('/merchant/dashboard', methods=['GET', 'POST'])
def merchant_dashboard():
    if 'user_id' not in session or session.get('role') != 'merchant':
        flash('Merchant access required', 'warning')
        return redirect(url_for('login'))
    user_id = ObjectId(session['user_id'])
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        price = request.form.get('price', '').strip()
        description = request.form.get('description', '').strip()
        image_url = request.form.get('image_url', '').strip()
        try:
            price_val = float(price)
        except Exception:
            price_val = 0.0
        if not title:
            flash('Product name required', 'danger')
            return redirect(url_for('merchant_dashboard'))
        products.insert_one({
            'title': title,
            'description': description,
            'price': price_val,
            'image_filename': image_url,
            'merchant_id': user_id
        })
        flash('Product added', 'success')
        return redirect(url_for('merchant_dashboard'))
    my_products = list(products.find({'merchant_id': user_id}))
    return render_template('merchant.html', products=my_products)


@app.route('/buy/<product_id>', methods=['POST'])
def buy(product_id):
    if 'user_id' not in session:
        flash('Please log in to buy', 'warning')
        return redirect(url_for('login'))
    try:
        prod_obj = products.find_one({'_id': ObjectId(product_id)})
        if not prod_obj:
            flash('Product not found', 'danger')
            return redirect(url_for('index'))
        orders.insert_one({
            'product_id': prod_obj['_id'],
            'buyer_id': ObjectId(session['user_id']),
            'status': 'pending'
        })
        flash('Purchase successful — order created', 'success')
    except Exception:
        flash('Could not complete purchase', 'danger')
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
