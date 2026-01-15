import os
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')


@app.route("/about")
def about():
    return render_template("aboutus.html")


@app.route("/membership")
def membership():
    return render_template("membership.html")

@app.route("/canton-fair")
def canton_fair():
    return render_template("cantonfair.html")


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

