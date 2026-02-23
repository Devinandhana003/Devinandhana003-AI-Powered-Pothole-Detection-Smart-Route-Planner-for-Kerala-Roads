import osmnx as ox
import networkx as nx
import pandas as pd
from geopy.distance import geodesic
 
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
