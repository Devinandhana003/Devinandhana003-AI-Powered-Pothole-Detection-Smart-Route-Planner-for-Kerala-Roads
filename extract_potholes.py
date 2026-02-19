from ultralytics import YOLO
import csv
import time

# Load trained model
model = YOLO("runs/detect/train/weights/best.pt")
# Input image
image_path = "test_image.jpg"

# Run detection
results = model(image_path)

# Open CSV file
with open("pothole_data.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["latitude", "longitude", "severity", "confidence", "timestamp"])

    for r in results:
        for box in r.boxes:
            conf = float(box.conf)
            x1, y1, x2, y2 = box.xyxy[0]

            # Calculate bounding box area
            bbox_area = (x2 - x1) * (y2 - y1)

            # Severity calculation
            severity = min(10, round((bbox_area * conf) / 10000, 2))

            # Prototype GPS (replace later with real GPS)
            latitude = 9.9312
            longitude = 76.2673

            timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

            writer.writerow([latitude, longitude, severity, conf, timestamp])

print("Pothole data stored successfully!")
