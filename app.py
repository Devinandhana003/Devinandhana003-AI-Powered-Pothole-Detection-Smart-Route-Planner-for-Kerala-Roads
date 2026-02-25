from flask import Flask, render_template, request
from route_optimization import generate_route

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/generate', methods=['POST'])
def generate():
    source = request.form['source']
    destination = request.form['destination']

result = generate_route(source, destination)

    return render_template(
        "index.html",
        shortest_risk=result["shortest_risk"],
        safest_risk=result["safest_risk"],
        reduction=result["reduction"],
        map_file=result["map_file"]
    )

if __name__ == '__main__':

    app.run(debug=True)
