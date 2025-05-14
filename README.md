# Email Classifier Web App

This is a web application for detecting spam emails using machine learning models. The frontend is built with React and Vite, while the backend is implemented in Python using Flask.

## Features

- Select from multiple machine learning models:
  - Logistic Regression
  - Naive Bayes
  - Decision Tree
  - Support Vector Classifier (SVC)
- Enter email text and classify it as **Ham**, **Uncertain**, or **Spam**.
- Displays spam probability with a circular progress bar.

## Project Structure
```
email-classifier-webapp/ 
├── backend/
│ ├── app.py # Backend API
│ ├── spam.csv # Dataset (SMS spam)
│ ├── train_models.py # Model training script
│ ├── train_models1.py # Alternative training script
│ ├── requirements.txt # Python dependencies
│ └── models/
│   ├── decision_tree.pkl
│   ├── logistic_regression.pkl
│   ├── naive_bayes.pkl
│   ├── svc.pkl
│   └── vectorizer.pkl
├── frontend/
│ ├── public/
│ │ └── vite.svg
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── assets/
│ │ │ └── react.svg
│ │ ├── App.css
│ │ ├── index.css
│ ├── index.html
│ ├── package.json
│ └── postcss.config.cjs

```
## Prerequisites

- Node.js (for the frontend)
- Python 3.x (for the backend)

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
    ```

2. Install dependencies:
    ```
    pip install -r requirements.txt
    ```
3. Start the Flask server:
    ```
    python app.py
    ```
    The backend will run on http://localhost:5000.
    
### Frontend

1. Navigate to the frontend directory:

    ```
    cd frontend
    ```

2. Install dependencies:
    ```
    npm install
    ```
3. Start the React app:
    ```
    npm run dev
    ```
    The frontend will run on http://localhost:5173.


## Usage

1. Open the frontend in your browser.
2. Enter the email text in the provided textarea.
3. Select a machine learning model from the dropdown.
4. Click the "Classify" button to get the spam prediction.
5. The result will be displayed below the button, along with the spam probability in a circular progress bar.


## License
This project is licensed under the MIT License. 
