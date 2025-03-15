from flask import Flask

# created a Flask app instance
app = Flask(__name__)


# defined route and a view function
@app.route('/')
def hello():
    return "Hello World"

# run app if this file is executed
if __name__ == "__main__":
    app.run(debug=True)