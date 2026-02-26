import osmnx as ox
import networkx as nx
import pandas as pd
from geopy.distance import geodesic
import folium
 
# Load road graph
place_name = "Kochi, Kerala, India"
G = ox.graph_from_place(place_name, network_type="drive")

# Load pothole data
potholes = pd.read_csv("pothole_data.csv")
print("Potholes loaded:", len(potholes))

for index, row in potholes.iterrows():
    lat = row["latitude"]
    lon = row["longitude"]
    severity = row["severity"]
 
    # Find nearest node in the graph
    nearest_node = ox.distance.nearest_nodes(G, lon, lat)
 
    # Increase weight of edges connected to that node
    for neighbor in G.neighbors(nearest_node):
        if "length" in G[nearest_node][neighbor][0]:
            G[nearest_node][neighbor][0]["length"] += severity * 10
 
print("Pothole weights added to graph successfully!")

source_lat, source_lon = 9.9312, 76.2673
dest_lat, dest_lon = 9.9800, 76.3000
source_node = ox.distance.nearest_nodes(G, source_lon, source_lat)
dest_node = ox.distance.nearest_nodes(G, dest_lon, dest_lat)
route = nx.shortest_path(G, source_node, dest_node, weight="length")
print("Safest route calculated!")
print("Route contains", len(route), "nodes.")

G_original = ox.graph_from_place(place_name, network_type="drive")
 
source_node_original = ox.distance.nearest_nodes(G_original, source_lon, source_lat)
dest_node_original = ox.distance.nearest_nodes(G_original, dest_lon, dest_lat)
 
shortest_route = nx.shortest_path(G_original, source_node_original, dest_node_original, weight="length")
 
print("Normal shortest route calculated!")
print("Shortest route contains", len(shortest_route), "nodes.")

def calculate_route_length(G, route):
    length = 0
    for i in range(len(route) - 1):
        edge_data = G.get_edge_data(route[i], route[i+1])[0]
        length += edge_data["length"]
    return length
 
shortest_length = calculate_route_length(G_original, shortest_route)
safest_length = calculate_route_length(G, route)
 
print("\n--- Route Comparison ---")
print("Shortest Route Distance:", round(shortest_length/1000, 2), "km")
print("Safest Route Distance:", round(safest_length/1000, 2), "km")

# Create base map centered at source
m = folium.Map(location=[source_lat, source_lon], zoom_start=13)
# Function to convert route nodes to coordinates
def get_route_coordinates(G, route):
    coords = []
    for node in route:
        point = G.nodes[node]
        coords.append((point["y"], point["x"]))
    return coords
# Get coordinates
shortest_coords = get_route_coordinates(G_original, shortest_route)
safest_coords = get_route_coordinates(G, route)
# Add shortest route (Blue)
folium.PolyLine(shortest_coords, color="blue", weight=5, tooltip="Shortest Route").add_to(m)
# Add safest route (Red)
folium.PolyLine(safest_coords, color="red", weight=5, tooltip="Safest Route").add_to(m)
# Save map
m.save("route_comparison.html")
print("Map saved as route_comparison.html")

def calculate_route_risk(G, route, potholes_df):
    risk = 0
    for index, row in potholes_df.iterrows():
        lat = row["latitude"]
        lon = row["longitude"]
        severity = row["severity"]
 
        nearest_node = ox.distance.nearest_nodes(G, lon, lat)
 
        if nearest_node in route:
            risk += severity
 
    return round(risk, 2)
 
shortest_risk = calculate_route_risk(G_original, shortest_route, potholes)
safest_risk = calculate_route_risk(G, route, potholes)
 
print("\n--- Safety Comparison ---")
print("Shortest Route Risk Score:", shortest_risk)
print("Safest Route Risk Score:", safest_risk)
 
if shortest_risk != 0:
    reduction = ((shortest_risk - safest_risk) / shortest_risk) * 100
    print("Risk Reduction:", round(reduction, 2), "%")
    
