import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
import pandas as pd

# Example Dataset
df = pd.read_csv('C:/Users/shamm/email-classifier-webapp/backend/spam.csv', encoding='ISO-8859-1')

  # Ensure proper encoding
df = df.dropna(subset=['label'])  # Drop rows with missing labels in 'label'

# Convert labels to binary (ham: 0, spam: 1)
df['label']= df['label'].map({'ham': 0, 'spam': 1})



# Continue with your text data

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

# Check for NaNs in train and test labels
# print(f"Labels NaN in training set: {y_train.isna().sum()}")
# print(f"Labels NaN in test set: {y_test.isna().sum()}")

# Ensure no NaN values remain after the dropna operation
if y_train.isna().any() or y_test.isna().any():
    raise ValueError("There are still NaN values in the labels (y_train or y_test). Please check the data.")

# Create 'models' folder if it doesn't exist
os.makedirs('models', exist_ok=True)

# Vectorizer
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)

# Save Vectorizer
with open('models/vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

# Models
models = {
    "logistic_regression": LogisticRegression(),
    "naive_bayes": MultinomialNB(),
    "decision_tree": DecisionTreeClassifier(random_state=42),
    "svc": SVC(probability=True)
}

# Train and Save
for name, model in models.items():
    model.fit(X_train_vec, y_train)
    with open(f'models/{name}.pkl', 'wb') as f:
        pickle.dump(model, f)

print("✅ All models trained and saved in /models folder")
