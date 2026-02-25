from flask import Flask, render_template, request
from route_optimization import generate_route

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/generate', methods=['POST'])
def generate():
    source_lat = float(request.form['source_lat'])
    source_lon = float(request.form['source_lon'])
    dest_lat = float(request.form['dest_lat'])
    dest_lon = float(request.form['dest_lon'])

    result = generate_route(source_lat, source_lon, dest_lat, dest_lon)

    return render_template(
        "index.html",
        shortest_risk=result["shortest_risk"],
        safest_risk=result["safest_risk"],
        reduction=result["reduction"],
        map_file=result["map_file"]
    )

if __name__ == '__main__':
    app.run(debug=True)