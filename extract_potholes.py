from ultralytics import YOLO
import csv
import time

# Load trained model
model = YOLO(r"D:\project\pothole_yolo\Data\runs\detect\train3\weights\best.pt")
# Input image
image_path = r"D:\project\pothole_yolo\Data\train\images\pothole_1.jpg"

# Run detection
results = model(image_path)

# Open CSV file
with open("pothole_data.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["latitude", "longitude", "severity", "confidence", "timestamp"])

    for r in results:
        for box in r.boxes:
            conf = box.conf.item()
            x1, y1, x2, y2 = box.xyxy[0]

            # Calculate bounding box area
            x1, y1, x2, y2 = box.xyxy[0]
            bbox_area = (x2.item() - x1.item()) * (y2.item() - y1.item())

            # Severity calculation
            severity = min(10, round((bbox_area * conf) / 10000, 2))

            # Prototype GPS (replace later with real GPS)
            latitude = 9.9312
            longitude = 76.2673

            timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

            writer.writerow([latitude, longitude, severity, conf, timestamp])

print("Pothole data stored successfully!")
