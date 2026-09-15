# ML pipeline

`train_model.py` validates the supplied CSV, reports sample/class/range information, removes null/duplicate records where necessary, then makes a fixed random-state 80/20 stratified split. Logistic Regression, Decision Tree, Random Forest, and KNN are evaluated using accuracy, weighted precision, recall, and F1. The best calculated weighted F1 model is serialized with its metadata and comparison table. Feature importance is saved only when the chosen estimator supports it.
