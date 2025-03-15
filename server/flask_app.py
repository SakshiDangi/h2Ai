from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
import numpy as np
import torch  # Assuming you are using PyTorch for classification
from torchvision import transforms
from ultralytics import YOLO
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
file_path = "/Users/nicholask/Desktop/HACKATHON/ImageDataTools/ML_training/model/PaHaWBest.pt" ### 0.895 accuracy
model = YOLO(file_path)

# Route to handle the image upload and classification
@app.route('/upload', methods=['POST'])
def upload_image():
    print("UPLOAD INFERED!!!!!!!")
    try:
        # Get the image data from the request
        data = request.get_json()
        image_data = data.get('image')


        # # Decode the base64 image
        # image_data = image_data.split(',')[1]  # Remove base64 header
        # image_bytes = base64.b64decode(image_data)
        
        # # Convert bytes to image
        # image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        # # Preprocess the image
        # image = transform(image).unsqueeze(0)  # Add batch dimension

        # # Send the image through the model
        # model.eval()  # Set model to evaluation mode
        # with torch.no_grad():
        #     output = model(image)
        #     _, predicted = torch.max(output, 1)
        
        # # Send the prediction back as a response
        # result = {'prediction': predicted.item()}
        result = {
            'prediction': 'Class 1',  # Example of a class label
            'confidence': 0.95        # Example of prediction confidence
        }

        # Return the hardcoded result as a JSON response
        print("RETURNING")
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)