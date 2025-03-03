import os
import uuid
import numpy as np
import cv2
import tensorflow as tf
from stegano import lsb
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load AI Model
MODEL_PATH = "model.h5"
model = None
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)


# 📌 Image Upload + Analysis (Steganography & AI Detection)
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "Aucun fichier fourni"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Aucun fichier sélectionné"}), 400

    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    steganography_result = analyze_steganography(filepath)
    ai_detection_result = detect_ai_image(filepath) if model else {"error": "Modèle AI non chargé"}
    metadata = get_image_metadata(filepath)

    return jsonify({
        "steganography": steganography_result,
        "ai_detection": ai_detection_result,
        "metadata": metadata,
        "image_path": filepath
    })


# 📌 Add Hidden Signature (Steganography)
@app.route('/add_steganography', methods=['POST'])
def add_steganography():
    if 'file' not in request.files or 'signature' not in request.form:
        return jsonify({"error": "Fichier ou signature manquants"}), 400

    file = request.files['file']
    signature = request.form['signature']

    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    output_filepath = embed_steganography(filepath, signature)

    return jsonify({"message": "Signature ajoutée avec succès", "image_path": output_filepath})


# 📌 Steganography Analysis (Detect Hidden Message)
def analyze_steganography(image_path):
    try:
        hidden_message = lsb.reveal(image_path)
        return {"signature_detected": True, "signature": hidden_message} if hidden_message else {"signature_detected": False}
    except Exception as e:
        return {"error": "Impossible to detect message."}


# 📌 Steganography Embedding (Hide Message)
def embed_steganography(image_path, signature):
    output_path = image_path.replace(".", "_steg.")
    try:
        hidden_image = lsb.hide(image_path, signature)
        hidden_image.save(output_path)
        return output_path
    except Exception as e:
        return str(e)
# 📌 AI-Generated Image Detection
def detect_ai_image(image_path):
    try:
        img = Image.open(image_path).convert("RGB")  # 🔹 Convertir en RGB pour éviter les erreurs de format
        img = img.resize((128, 128), Image.Resampling.LANCZOS)  # 🔹 Redimensionner correctement
        img_array = np.array(img, dtype=np.float32) / 255.0  # 🔹 Normalisation correcte
        img_array = np.expand_dims(img_array, axis=0)  # 🔹 Ajouter une dimension batch

        print(f"DEBUG - Image shape before prediction: {img_array.shape}")  # Devrait être (1, 128, 128, 3)

        prediction = model.predict(img_array) if model else [[0.0]]
        is_ai_generated = prediction[0][0] > 0.5

        return {"is_ai_generated": bool(is_ai_generated), "confidence": float(prediction[0][0] * 100)}
    except Exception as e:
        return {"error": str(e)}



# 📌 Image Metadata Extraction
def get_image_metadata(image_path):
    img = Image.open(image_path)
    return {
        "dimensions": f"{img.width}x{img.height}",
        "format": img.format,
        "size": f"{os.path.getsize(image_path) / 1024:.2f} KB"
    }


if __name__ == '__main__':
    app.run(debug=True)
