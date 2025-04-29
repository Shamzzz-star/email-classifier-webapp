import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix
import pickle
import os




# Load the dataset
df = pd.read_csv('C:/Users/shamm/email-classifier-webapp/backend/spam.csv', encoding='ISO-8859-1')

# Features and target
X = df['text']
y = df['label']

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Vectorize the text
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train Decision Tree
models={"decision_tree1": DecisionTreeClassifier(random_state=42)}
for name, model in models.items():
    model.fit(X_train_vec, y_train)
    with open(f'models/{name}.pkl', 'wb') as f:
        pickle.dump(model, f)

# # Predict and evaluate
# y_pred = dt_model.predict(X_test_vec)
# conf_matrix = confusion_matrix(y_test, y_pred)
# class_report = classification_report(y_test, y_pred, output_dict=True)

# conf_matrix, class_report
