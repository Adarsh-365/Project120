from flask import Flask, render_template, request

app = Flask(__name__)

# --- Hardcoded Data (No Database) ---
# This data will appear on your index.html page
products_data = [
    {
        'id': 1,
        'title': 'High-Speed Router',
        'price': 45.99,
        'description': 'Dual-band Wi-Fi router for office use.',
        'image_url': 'https://via.placeholder.com/300?text=Router'
    },
    {
        'id': 2,
        'title': 'Mechanical Keyboard',
        'price': 89.50,
        'description': 'RGB backlit mechanical keyboard.',
        'image_url': 'https://via.placeholder.com/300?text=Keyboard'
    },
    {
        'id': 3,
        'title': 'Wireless Mouse',
        'price': 25.00,
        'description': 'Ergonomic wireless mouse with long battery life.',
        'image_url': 'https://via.placeholder.com/300?text=Mouse'
    },
    {
        'id': 4,
        'title': '4K Monitor',
        'price': 299.99,
        'description': '27-inch 4K UHD IPS Monitor.',
        'image_url': 'https://via.placeholder.com/300?text=Monitor'
    }
]

@app.route('/')
def index():
    # Get search query from URL (e.g., ?q=mouse)
    q = request.args.get('q', '').lower().strip()
    
    # Filter products based on search (or show all if no search)
    if q:
        filtered_products = [p for p in products_data if q in p['title'].lower()]
    else:
        filtered_products = products_data

    # Render the HTML and pass the products list
    # We pass user=None because we removed the login system
    return render_template('index.html', products=filtered_products, user=None, q=q)

if __name__ == '__main__':
    app.run(debug=True)
