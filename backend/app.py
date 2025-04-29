from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load vectorizer and models
with open('models/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

models = {
    "Logistic Regression": pickle.load(open("models/logistic_regression.pkl", "rb")),
    "Naive Bayes": pickle.load(open("models/naive_bayes.pkl", "rb")),
    "Decision Tree": pickle.load(open("models/decision_tree.pkl", "rb")),
    "SVC": pickle.load(open("models/svc.pkl", "rb")),
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    model_name = data['model']
    text = data['text']
    threshold = 0.5  # You can adjust this threshold as needed

    if model_name not in models:
        return jsonify({"error": "Invalid model selected"}), 400

    model = models[model_name]
    X = vectorizer.transform([text])
    probabilities = model.predict_proba(X)[0]
    spam_prob = probabilities[1] * 100

    prediction_label = "Spam" if probabilities[1] >= threshold else "Ham"

    return jsonify({
        "spam_probability": spam_prob,
        "label": prediction_label
    })


if __name__ == '__main__':
    app.run(debug=True)
