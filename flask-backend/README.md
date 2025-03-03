# Flask Backend Project

This project is a Flask-based backend application that provides functionalities for image upload, steganography analysis, AI-generated image detection, and metadata extraction.

## Project Overview

### Features

#### Image Upload:
- Users can upload images to the server.
- The uploaded image is analyzed for hidden messages using steganography.
- The image is checked to determine if it is AI-generated using a pre-trained model.
- Metadata of the image (dimensions, format, size) is extracted.

#### Steganography:
- Detect hidden messages in images using the Least Significant Bit (LSB) method.
- Embed a hidden signature (message) into an image.

#### AI-Generated Image Detection:
- Uses a pre-trained TensorFlow model (model.h5) to detect if an image is AI-generated.

#### Metadata Extraction:
- Extracts basic metadata (dimensions, format, size) from the uploaded image.

## Project Structure

```
FLASK-BACKEND/
├── __pycache__/
├── instance/
├── uploads/                # Folder to store uploaded images
├── venv/                   # Virtual environment folder
├── Include/
├── Lib/
├── Scripts/
│   ├── pyvenv.cfg
│   ├── .gitignore
├── app.py                  # Main Flask application file
├── model.h5                # Pre-trained TensorFlow model
├── models.py               # (Optional) Model-related code
├── realFake.ipynb          # (Optional) Jupyter notebook for model training/testing
├── steganoo.py             # (Optional) Steganography-related code
```

## Setup Instructions

### 1. Create a Virtual Environment

A virtual environment is used to isolate the project dependencies.

#### Windows
1. Open a terminal (Command Prompt or PowerShell).
2. Navigate to the project directory:
   ```
   cd path\to\FLASK-BACKEND
   ```
3. Create a virtual environment:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   ```
   venv\Scripts\activate
   ```

#### macOS/Linux
1. Open a terminal.
2. Navigate to the project directory:
   ```
   cd path/to/FLASK-BACKEND
   ```
3. Create a virtual environment:
   ```
   python3 -m venv venv
   ```
4. Activate the virtual environment:
   ```
   source venv/bin/activate
   ```

### 2. Install Dependencies

Install the required Python packages using the requirements.txt file.

1. Ensure the virtual environment is activated.
2. Run the following command:
   ```
   python -m pip install -r requirements.txt
   ```

### 3. Run the Flask Application

1. Ensure the virtual environment is activated.
2. Run the Flask application:
   ```
   python app.py
   ```
3. The application will start running at http://127.0.0.1:5000/.

## API Endpoints

### 1. Upload Image

- **Endpoint:** `/upload`
- **Method:** POST
- **Description:** Upload an image for steganography analysis, AI detection, and metadata extraction.
- **Request:**
  - Form-data:
    - `file`: The image file to upload.
- **Response:**
  ```json
  {
    "steganography": {
      "signature_detected": true/false,
      "signature": "hidden message" (if detected)
    },
    "ai_detection": {
      "is_ai_generated": true/false,
      "confidence": "confidence percentage"
    },
    "metadata": {
      "dimensions": "width x height",
      "format": "image format",
      "size": "file size in KB"
    },
    "image_path": "path to uploaded image"
  }
  ```

### 2. Add Hidden Signature

- **Endpoint:** `/add_steganography`
- **Method:** POST
- **Description:** Embed a hidden signature (message) into an image using steganography.
- **Request:**
  - Form-data:
    - `file`: The image file to embed the signature into.
    - `signature`: The hidden message to embed.
- **Response:**
  ```json
  {
    "message": "Signature ajoutée avec succès",
    "image_path": "path to the modified image"
  }
  ```

## Requirements

The requirements.txt file should include the following dependencies:

```
Flask==2.3.2
Flask-Cors==4.0.0
numpy==1.23.5
opencv-python==4.7.0.72
Pillow==9.5.0
stegano==0.9.4
tensorflow==2.12.0
```

## Troubleshooting

### 1. Model Not Loading
- Ensure the model.h5 file is present in the project directory.
- Verify the model's input shape matches the image preprocessing in detect_ai_image.

### 2. Dependency Issues
- Ensure the virtual environment is activated before installing dependencies.
- If TensorFlow installation fails, try installing a specific version compatible with your system.

### 3. Debugging
- Use the print statements in the code to debug issues (e.g., image shape before prediction).

## Example Usage

### Upload an Image
Use a tool like Postman or curl to send a POST request to `/upload` with an image file.

Example using curl:
```
curl -X POST -F "file=@image.png" http://127.0.0.1:5000/upload
```

### Add a Hidden Signature
Use a tool like Postman or curl to send a POST request to `/add_steganography` with an image file and a signature.

Example using curl:
```
curl -X POST -F "file=@image.png" -F "signature=HelloWorld" http://127.0.0.1:5000/add_steganography
```

## License

This project is open-source and available under the MIT License.

## Contact

For any questions or issues, please contact the project maintainer.
