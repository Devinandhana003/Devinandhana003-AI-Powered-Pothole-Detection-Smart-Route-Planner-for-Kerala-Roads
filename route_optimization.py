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
