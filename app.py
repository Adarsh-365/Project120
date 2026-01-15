import os
from flask import Flask, render_template ,redirect

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')


@app.route("/about")
def about():
    return render_template("aboutus.html")

@app.route("/memdoc")
def membersgipdoc():
    return redirect("https://docs.google.com/document/d/17tn7U1yVHc7fGgMQfd0geisgS_FYTpOG/edit?usp=sharing&ouid=100361699467384810298&rtpof=true&sd=true", code=302)


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


