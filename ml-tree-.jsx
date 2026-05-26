import { useState, useEffect, useRef } from "react";

const DOMAIN_COLOR = {
  "Machine Learning": "#60e4d4",
  "1. Supervised Learning": "#b48ef5",
  "A. Regression": "#b48ef5",
  "B. Classification": "#b48ef5",
  "2. Unsupervised Learning": "#8b7cf0",
  "A. Clustering": "#8b7cf0",
  "B. Dimensionality Reduction": "#8b7cf0",
  "C. Association Rule Learning": "#8b7cf0",
  "D. Anomaly Detection": "#8b7cf0",
  "3. Semi-Supervised Learning": "#5ec4f5",
  "4. Reinforcement Learning": "#f5a54a",
  "A. Value-Based Methods": "#f5a54a",
  "B. Policy-Based Methods": "#f5a54a",
  "C. Model-Based RL": "#f5a54a",
  "D. Advanced RL": "#f5a54a",
  "5. Deep Learning": "#4ecf9a",
  "A. Artificial Neural Networks": "#4ecf9a",
  "B. Computer Vision Models": "#4ecf9a",
  "C. Sequence Models": "#4ecf9a",
  "D. Generative Models": "#4ecf9a",
  "E. Transfer Learning": "#4ecf9a",
  "6. Natural Language Processing": "#f0c94a",
  "Text Preprocessing": "#f0c94a",
  "Text Representation": "#f0c94a",
  "NLP Tasks": "#f0c94a",
  "Modern NLP": "#f0c94a",
  "7. Computer Vision": "#f07080",
  "8. Time Series ML": "#5ab0f0",
  "9. Recommendation Systems": "#a07cf5",
  "10. Model Evaluation": "#4dbf9a",
  "Classification Metrics": "#4dbf9a",
  "Regression Metrics": "#4dbf9a",
  "Clustering Metrics": "#4dbf9a",
  "11. Feature Engineering": "#e08085",
  "Encoding Categorical Data": "#e08085",
  "Feature Scaling": "#e08085",
  "12. Model Optimization": "#5ab0c8",
  "Hyperparameter Tuning": "#5ab0c8",
  "Regularization": "#5ab0c8",
  "Ensemble Learning": "#5ab0c8",
  "Model Compression": "#5ab0c8",
  "13. MLOps": "#70c4c8",
  "Data Versioning": "#70c4c8",
  "Experiment Tracking": "#70c4c8",
  "Model Deployment": "#70c4c8",
  "CI/CD for ML": "#70c4c8",
  "Model Monitoring": "#70c4c8",
};
const getColor = (name, fallback = "#60e4d4") => DOMAIN_COLOR[name] || fallback;

const DEFINITIONS = {
  "Machine Learning": "The science of building systems that recognize patterns, learn from experience, and make intelligent decisions from data — without being explicitly programmed for every scenario.",
  "1. Supervised Learning": "Training a model on labeled data — each input comes paired with the correct answer — so it learns to generalize to new, unseen examples.",
  "A. Regression": "Predicting a continuous numeric value by learning the relationship between input features and a real-valued output.",
  "B. Classification": "Predicting which discrete category an input belongs to — the model draws decision boundaries between classes.",
  "Linear Regression": "Fits a straight line through data points to predict a numeric output. The simplest and most interpretable predictive model.",
  "Polynomial Regression": "Extends linear regression by fitting curved lines — captures non-linear relationships using higher-degree terms.",
  "Ridge Regression": "Linear regression with L2 penalty — shrinks all coefficients to prevent overfitting while keeping every feature.",
  "Lasso Regression": "Linear regression with L1 penalty — can shrink some coefficients to exactly zero, effectively selecting only key features.",
  "ElasticNet Regression": "Combines Ridge and Lasso penalties. Best for correlated features where you want partial shrinkage and selection.",
  "Decision Tree Regression": "Partitions input space into rectangles by splitting on feature thresholds, predicting the mean value at each leaf.",
  "Random Forest Regression": "Builds hundreds of trees on random data subsets and averages their predictions — robust, accurate, resistant to noise.",
  "Gradient Boosting Regression": "Sequentially adds trees, each correcting residual errors of the previous. State-of-the-art for tabular data.",
  "XGBoost Regression": "Optimized gradient boosting with regularization, parallelism, and built-in handling of missing values.",
  "LightGBM Regression": "Leaf-wise tree growth for gradient boosting — significantly faster on large datasets without accuracy loss.",
  "Support Vector Regression": "Finds a tube around the true values — predictions inside the tube are not penalized. Robust to outliers.",
  "Logistic Regression": "Maps inputs to a probability via the sigmoid function. Despite the name, it classifies, not regresses.",
  "K-Nearest Neighbors": "Classifies a point by majority vote among its K closest training examples. No training — all computation at inference.",
  "Naive Bayes": "Applies Bayes' theorem assuming feature independence. Extremely fast; excels on text classification.",
  "Decision Tree Classifier": "Recursively splits data on feature thresholds to form a tree of if-else rules leading to class predictions.",
  "Random Forest Classifier": "Ensemble of diverse decision trees — each votes, majority wins. Reduces variance and overfitting dramatically.",
  "Support Vector Machine": "Finds the maximum-margin hyperplane that separates classes. Uses kernels to handle non-linear boundaries.",
  "Gradient Boosting Classifier": "Boosted ensemble of weak trees — each iteration corrects the previous. High accuracy on structured data.",
  "XGBoost Classifier": "Regularized gradient boosting with tree pruning, parallel processing, and cache-aware computation.",
  "LightGBM Classifier": "Microsoft's gradient boosting — histogram-based splits make it 10x faster on large datasets.",
  "CatBoost Classifier": "Gradient boosting with native categorical feature support — minimal preprocessing, high accuracy.",
  "Neural Network Classifier": "Multiple layers of weighted nodes that transform inputs into class probabilities via backpropagation.",
  "2. Unsupervised Learning": "Finding hidden structure in unlabeled data — no correct answers provided — the algorithm discovers patterns on its own.",
  "A. Clustering": "Grouping data points so that items within a group are more similar to each other than to items in other groups.",
  "B. Dimensionality Reduction": "Projecting high-dimensional data into fewer dimensions while preserving the most important structure.",
  "C. Association Rule Learning": "Discovering co-occurrence patterns — items or events that tend to appear together in transactions.",
  "D. Anomaly Detection": "Identifying rare data points that deviate significantly from the established normal pattern.",
  "K-Means Clustering": "Assigns points to K clusters by iteratively minimizing the sum of squared distances to cluster centroids.",
  "Hierarchical Clustering": "Builds a dendrogram by either merging the closest clusters (agglomerative) or splitting the largest (divisive).",
  "DBSCAN": "Density-Based Spatial Clustering — groups dense regions, labels sparse outliers as noise. K not required.",
  "Mean Shift Clustering": "Iteratively shifts each point toward the densest region in its neighborhood until convergence.",
  "Gaussian Mixture Models": "Models data as a mixture of Gaussian distributions — soft assignments allow points to belong to multiple clusters.",
  "Spectral Clustering": "Uses eigenvectors of the similarity graph Laplacian to find clusters based on connectivity, not distance.",
  "PCA": "Principal Component Analysis — projects data onto orthogonal axes of maximum variance to compress it.",
  "t-SNE": "Converts pairwise similarities into probabilities and minimizes KL divergence in low-dim space. For visualization only.",
  "UMAP": "Constructs a topological representation of data and optimizes its low-dimensional equivalent. Faster than t-SNE, preserves global structure.",
  "LDA": "Linear Discriminant Analysis — finds the projection that maximizes between-class and minimizes within-class variance.",
  "Autoencoders": "Encoder compresses input to a bottleneck latent code; decoder reconstructs the original. Learns efficient representations.",
  "Feature Selection": "Selecting a subset of the most informative features — removes noise and speeds up training.",
  "Apriori Algorithm": "Generates candidate itemsets bottom-up, pruning any set whose subset is infrequent. Finds association rules.",
  "FP-Growth": "Builds a compact prefix-tree (FP-tree) to mine frequent itemsets without generating candidates.",
  "Eclat Algorithm": "Uses vertical data format (tidsets) and set intersections to efficiently mine frequent itemsets.",
  "Isolation Forest": "Randomly partitions data — anomalies are isolated in fewer splits and appear in shorter subtrees.",
  "One-Class SVM": "Learns a hypersphere around normal training data — anything outside is an anomaly.",
  "Local Outlier Factor": "Compares each point's local density to its neighbors' — outliers have significantly lower density.",
  "Autoencoder-Based Detection": "Normal data reconstructs well; anomalies have high reconstruction error — the error IS the score.",
  "Statistical Outlier Detection": "Flags points beyond Z-score thresholds or outside 1.5×IQR fences as outliers.",
  "3. Semi-Supervised Learning": "Uses a small labeled set plus a large unlabeled pool — gets most of supervised accuracy at a fraction of annotation cost.",
  "Self-Training": "Iteratively labels the most confident unlabeled predictions, adds them to training, and retrains.",
  "Label Propagation": "Propagates known labels to unlabeled nodes through a weighted similarity graph.",
  "Label Spreading": "Smoother variant of label propagation — allows labeled nodes to partially change their own labels.",
  "Pseudo Labeling": "Assigns predicted labels to all unlabeled data and retrains on the enlarged labeled set.",
  "Semi-Supervised Deep Learning": "Uses consistency regularization, contrastive objectives, or generative models to leverage unlabeled data.",
  "4. Reinforcement Learning": "An agent learns by taking actions in an environment, receiving scalar reward signals, and updating its policy to maximize cumulative future reward.",
  "A. Value-Based Methods": "Estimate the value (expected return) of states or actions — act greedily by choosing the highest-value action.",
  "B. Policy-Based Methods": "Directly parameterize and optimize the policy — no value function required. Works in continuous action spaces.",
  "C. Model-Based RL": "Learn or use a model of the environment's dynamics to simulate future trajectories and plan actions.",
  "D. Advanced RL": "Mature algorithms combining stability, scalability, and sample efficiency for real-world deployment.",
  "Q-Learning": "Off-policy TD method that learns action values by iterating the Bellman optimality equation.",
  "Deep Q-Network": "Combines Q-learning with a deep CNN — experience replay and target networks stabilize training.",
  "Double DQN": "Decouples action selection from evaluation using two networks — eliminates systematic overestimation bias.",
  "Policy Gradient": "Directly computes the gradient of expected return with respect to policy parameters and ascends it.",
  "REINFORCE": "Monte Carlo policy gradient — collects full episode returns and uses them to update the policy.",
  "Actor-Critic": "Actor updates the policy; Critic estimates value — reduces variance of policy gradient without bias.",
  "Planning-Based RL": "Uses the learned environment model to perform lookahead search (e.g., MCTS) before committing to an action.",
  "Environment Model Learning": "Learns a transition model P(s'|s,a) and reward model R(s,a) from experience to enable planning.",
  "PPO": "Proximal Policy Optimization — clips the policy ratio to limit update size, making training stable and sample-efficient.",
  "A3C": "Asynchronous Advantage Actor-Critic — multiple parallel workers with independent environments stabilize training.",
  "DDPG": "Off-policy actor-critic for continuous actions — uses a deterministic policy and experience replay.",
  "SAC": "Soft Actor-Critic — maximizes expected return plus entropy, encouraging exploration and robust behavior.",
  "Multi-Agent RL": "Multiple agents jointly learn policies in a shared environment — cooperative, competitive, or mixed settings.",
  "5. Deep Learning": "Neural networks with many hierarchical layers that automatically learn representations from raw data — pixels, text, audio — without manual feature engineering.",
  "A. Artificial Neural Networks": "The base architecture — layers of linear transformations followed by non-linear activations, trained via gradient backpropagation.",
  "B. Computer Vision Models": "Deep networks that process images through convolutional or attention operations to understand visual content.",
  "C. Sequence Models": "Architectures that model temporal dependencies — crucial for language, audio, time series, and video.",
  "D. Generative Models": "Learn the data distribution to synthesize new samples — images, text, audio — that resemble real data.",
  "E. Transfer Learning": "Initialize from a pretrained model and adapt it to a new task — dramatically reduces data and compute requirements.",
  "Perceptron": "Single linear threshold unit — the atom of neural networks. Learns linearly separable problems.",
  "Multi-Layer Perceptron": "Stacked layers of perceptrons with non-linear activations — can approximate any continuous function.",
  "Feedforward Neural Network": "Information flows forward only — input → hidden layers → output. The canonical neural network.",
  "CNN": "Convolutional filters slide over inputs to detect local patterns — shared weights make it translation-invariant and efficient.",
  "ResNet": "Skip connections allow gradients to bypass layers — enables training of 100+ layer networks without degradation.",
  "VGG": "16–19 layer network using only 3×3 convolutions — proved depth alone improves accuracy.",
  "Inception": "Parallel branches with 1×1, 3×3, 5×5 convolutions fused — captures multi-scale features efficiently.",
  "EfficientNet": "Compound scaling of depth, width, and resolution via neural architecture search — highest accuracy per FLOP.",
  "YOLO": "Single-pass detection — divides image into a grid, predicts boxes and classes simultaneously. Real-time capable.",
  "Faster R-CNN": "Region Proposal Network shares convolutional features with the detector — accurate two-stage detection.",
  "Vision Transformer": "Splits image into patches, treats them as tokens, and applies self-attention — scales better than CNNs.",
  "RNN": "Hidden state carries information across time steps — processes sequences token by token with shared weights.",
  "LSTM": "Gated cell with input, forget, and output gates — selectively remembers long-range information over sequences.",
  "GRU": "Simplified LSTM with reset and update gates — fewer parameters, comparable performance.",
  "Transformer": "Self-attention over all tokens in parallel — no recurrence, scales to billions of parameters, the backbone of GPT/BERT.",
  "Variational Autoencoders": "Encodes inputs as distributions; samples from them to decode — smooth latent space enables controlled generation.",
  "GANs": "Generator and discriminator play a minimax game — generator fools discriminator into accepting fake data as real.",
  "Diffusion Models": "Learn to reverse a Gaussian noising process step-by-step — state-of-the-art image/audio/video generation.",
  "Large Language Models": "Transformers pretrained on trillions of tokens with next-token prediction — emergent reasoning, coding, and dialogue.",
  "Pretrained Models": "Weights already tuned on massive datasets — reusing them is faster, cheaper, and more accurate than training from scratch.",
  "Fine-Tuning": "Update all or selected layers of a pretrained model on task-specific data — adapts general knowledge to specialized needs.",
  "Feature Extraction": "Freeze pretrained weights; use their output embeddings as input features for a lightweight task-specific head.",
  "Foundation Models": "Massive pretrained models (GPT-4, CLIP, Gemini) that serve as a general base for countless downstream tasks.",
  "6. Natural Language Processing": "Teaching machines to process, understand, and generate human language — bridging the gap between unstructured text and actionable insight.",
  "Text Preprocessing": "Normalizing raw text into a clean, consistent form that downstream models can process reliably.",
  "Text Representation": "Converting symbolic text into dense numeric vectors that capture semantic meaning for ML models.",
  "NLP Tasks": "The canonical problems NLP systems are designed to solve — each requires a different formulation and evaluation.",
  "Modern NLP": "Large Transformer-based models pretrained on massive corpora that achieve state-of-the-art on virtually every NLP benchmark.",
  "Tokenization": "Splitting text into atomic units — words, subwords (BPE), or characters — as the first step in any NLP pipeline.",
  "Stopword Removal": "Discarding high-frequency function words that add little discriminative signal for tasks like topic modeling.",
  "Stemming": "Rule-based suffix stripping to reduce words to a common root form — fast but linguistically imprecise.",
  "Lemmatization": "Morphological analysis that maps inflected forms to their dictionary lemma — linguistically accurate.",
  "Text Cleaning": "Stripping HTML tags, special characters, URLs, and normalizing whitespace and unicode.",
  "Bag of Words": "Represent a document as a sparse vector of word counts — ignores order and context entirely.",
  "TF-IDF": "Down-weight common words by document frequency — highlights discriminative terms unique to each document.",
  "Word2Vec": "Predicts surrounding words (skip-gram) or center word (CBOW) — semantically similar words cluster in vector space.",
  "GloVe": "Factorizes the global word co-occurrence matrix — combines local and global corpus statistics.",
  "FastText": "Represents words as sums of character n-gram embeddings — handles morphology and out-of-vocabulary words.",
  "Embeddings": "Continuous dense vector representations where geometric relationships encode semantic and syntactic similarity.",
  "Sentiment Analysis": "Classifying the emotional polarity of text — positive, negative, neutral, or fine-grained emotion categories.",
  "Text Classification": "Assigning one or more predefined labels to a text document — topic, language, intent, spam.",
  "Named Entity Recognition": "Identifying and categorizing spans of text as named entities — persons, organizations, locations, dates.",
  "Machine Translation": "Encoding source-language text and decoding it into semantically equivalent target-language text.",
  "Question Answering": "Extracting or generating an answer to a natural language question, given a context document or knowledge base.",
  "Text Summarization": "Producing a shorter version of a document that preserves its key information — extractive or abstractive.",
  "Chatbots": "Systems that maintain multi-turn conversations, combining NLU for intent detection and NLG for response generation.",
  "Transformers": "Self-attention + positional encoding + feed-forward layers — processes entire sequences in parallel.",
  "BERT": "Bidirectional masked language modeling — reads context from both directions for deep understanding.",
  "GPT": "Autoregressive left-to-right language modeling — predicts the next token; scales to emergent few-shot capabilities.",
  "T5": "Casts every NLP task as text-to-text — a single model architecture handles translation, summarization, QA, and more.",
  "LLaMA": "Meta's efficient open-weight LLM family — trained on public data, broadly adopted for research and fine-tuning.",
  "Retrieval-Augmented Generation": "Retrieves relevant documents at inference time and conditions generation on them — reduces hallucination, stays current.",
  "7. Computer Vision": "Algorithms that enable machines to acquire, process, and interpret visual information from images and video.",
  "Image Classification": "Assigns a single label to an entire image — the foundational CV task, solved by CNNs and ViTs.",
  "Object Detection": "Predicts the class and bounding box of every object instance in an image simultaneously.",
  "Image Segmentation": "Assigns a class label to every pixel — semantic (category per pixel) or instance (individual objects).",
  "Face Recognition": "Embeds faces into a metric space where same-identity faces are close and different-identity faces are far.",
  "OCR": "Detects text regions in images and transcribes them to machine-readable characters via sequence models.",
  "Pose Estimation": "Predicts the 2D/3D coordinates of anatomical keypoints — joints, hands, face landmarks.",
  "Image Generation": "Synthesizes novel images from noise, class labels, text prompts, or other images via generative models.",
  "Video Analysis": "Extends image understanding to temporal sequences — action recognition, tracking, optical flow, event detection.",
  "8. Time Series ML": "Machine learning applied to ordered sequences of measurements indexed by time — capturing temporal dependencies and seasonal patterns.",
  "Time Series Forecasting": "Predicting future values of a time series given its history and optionally exogenous variables.",
  "ARIMA": "Autoregressive Integrated Moving Average — differencing for stationarity, AR for autocorrelation, MA for residual correlation.",
  "SARIMA": "Extends ARIMA with seasonal differencing and seasonal AR/MA terms — handles periodic patterns.",
  "Prophet": "Additive model with piecewise linear/logistic trend, Fourier-series seasonality, and holiday effects.",
  "LSTM Forecasting": "LSTM networks model non-linear temporal dependencies across long horizons — outperforms ARIMA on complex series.",
  "Temporal Convolutional Networks": "Causal dilated 1D convolutions process sequences with large receptive fields and full parallelism.",
  "Transformer Forecasting": "Self-attention over time steps — captures long-range dependencies without sequential computation.",
  "Anomaly Detection in Time Series": "Detecting point, contextual, and collective anomalies in temporal streams — critical for monitoring and alerting.",
  "9. Recommendation Systems": "Systems that predict user preference scores or rankings for items not yet encountered — the engine behind personalization.",
  "Content-Based Filtering": "Recommends items with similar features to what a user has previously liked — profile-based, no cold-start for items.",
  "Collaborative Filtering": "Leverages the collective behavior of all users — users with similar history get similar recommendations.",
  "Matrix Factorization": "Decomposes the user-item matrix into low-rank latent factors — SVD, ALS, and SGD-based approaches.",
  "Hybrid Recommendation": "Combines content-based and collaborative signals — mitigates cold-start and sparsity simultaneously.",
  "Neural Recommendation Systems": "Deep models (DLRM, two-tower, BERT4Rec) that learn rich interaction patterns from raw features and sequences.",
  "Ranking Models": "Learn a scoring function to rank a candidate set by relevance — pointwise, pairwise, or listwise objectives.",
  "10. Model Evaluation": "Quantifying model performance on held-out data to guide selection, debugging, and deployment decisions.",
  "Classification Metrics": "Metrics measuring how correctly a model assigns discrete labels to inputs.",
  "Regression Metrics": "Metrics measuring the magnitude and direction of error in continuous predictions.",
  "Clustering Metrics": "Metrics assessing cluster quality — compactness, separation, and agreement with external labels.",
  "Accuracy": "Proportion of correctly classified instances — misleading when class distributions are imbalanced.",
  "Precision": "Of all predicted positives, what fraction are truly positive? Minimizes false discovery rate.",
  "Recall": "Of all true positives, what fraction did the model detect? Minimizes false negative rate.",
  "F1-Score": "Harmonic mean of precision and recall — balanced summary for imbalanced classification problems.",
  "Confusion Matrix": "N×N grid showing predicted vs. true labels for every class — full diagnostic picture.",
  "ROC-AUC": "Area under the ROC curve — probability that the model ranks a random positive above a random negative.",
  "Log Loss": "Cross-entropy between predicted probabilities and true labels — penalizes confident wrong predictions heavily.",
  "MAE": "Mean Absolute Error — average of |y - ŷ|. Interpretable in original units, robust to outliers.",
  "MSE": "Mean Squared Error — penalizes large errors quadratically; sensitive to outliers but differentiable everywhere.",
  "RMSE": "Square root of MSE — restores original units and is the most commonly reported regression metric.",
  "R² Score": "Coefficient of determination — fraction of variance explained by the model. 0 = mean baseline, 1 = perfect.",
  "MAPE": "Mean Absolute Percentage Error — scale-independent error expressed as a percentage of the true value.",
  "Silhouette Score": "Mean (intra-cluster cohesion − inter-cluster separation) / max of the two. Range: −1 to 1.",
  "Davies-Bouldin Index": "Average ratio of within-cluster scatter to between-cluster separation — lower is better.",
  "Inertia": "Total sum of squared distances from each point to its assigned centroid — lower = tighter clusters.",
  "11. Feature Engineering": "Crafting informative numeric representations from raw data — often the highest-leverage activity in a data science project.",
  "Handling Missing Values": "Imputation (mean, median, KNN, model-based) or indicator variables — prevents information loss from dropping rows.",
  "Encoding Categorical Data": "Transforming nominal or ordinal strings into numeric representations compatible with ML algorithms.",
  "Feature Scaling": "Aligning feature magnitudes so gradient-based and distance-based algorithms behave consistently.",
  "Label Encoding": "Maps each category to an integer — introduces ordinal relationship where none may exist.",
  "One-Hot Encoding": "Creates a binary indicator column per category — no ordinal assumption, high-dimensional for many categories.",
  "Target Encoding": "Replaces category with the mean target value of that group — powerful but risks target leakage.",
  "Standardization": "Z-score normalization: subtract mean, divide by std — centers data with unit variance.",
  "Normalization": "Min-max scaling to [0,1] — preserves the shape of distribution, sensitive to outliers.",
  "Robust Scaling": "Scales using median and IQR instead of mean and std — resistant to outlier contamination.",
  "Outlier Handling": "Detecting and treating extreme values via clipping, transformation, or separate modeling.",
  "Data Transformation": "Applying log, sqrt, Box-Cox, or power transforms to make distributions more Gaussian and stable.",
  "12. Model Optimization": "Systematic techniques to improve model performance, generalization, and inference efficiency.",
  "Hyperparameter Tuning": "Searching the configuration space for settings that maximize validation performance.",
  "Regularization": "Adding complexity penalties to the loss function — trades training accuracy for generalization.",
  "Cross Validation": "K-fold splitting — train on K-1 folds, evaluate on 1, rotate. Reliable performance estimation.",
  "Early Stopping": "Monitor validation loss — halt training when it plateaus or worsens. Natural regularizer.",
  "Ensemble Learning": "Combining predictions from multiple diverse models — lower variance, lower bias, more robust.",
  "Model Compression": "Reducing memory, latency, and compute of trained models for edge and mobile deployment.",
  "Grid Search": "Exhaustive search over all combinations of a discrete hyperparameter grid.",
  "Random Search": "Randomly samples from the hyperparameter space — statistically more efficient than grid search in high dimensions.",
  "Bayesian Optimization": "Maintains a surrogate model of the objective and uses acquisition functions to choose the next evaluation point.",
  "Optuna": "Define-by-run framework with TPE sampler and asynchronous pruning — the modern standard for hyperparameter optimization.",
  "L1 Regularization": "Adds ‖w‖₁ to loss — induces exact sparsity by driving irrelevant weights to zero.",
  "L2 Regularization": "Adds ‖w‖₂² to loss — penalizes large weights smoothly, weight decay in deep learning.",
  "Dropout": "Randomly zeroes activations during training — reduces co-adaptation, approximates ensembling.",
  "Bagging": "Bootstrap aggregating — each model sees a random sample with replacement; final prediction is averaged.",
  "Boosting": "Sequential ensemble — each learner focuses on examples misclassified by previous ones; AdaBoost, XGBoost.",
  "Stacking": "Meta-learner trained on out-of-fold predictions from base models — learns the optimal combination.",
  "Quantization": "Reduces weight and activation precision (FP32 → INT8) — 4× model size reduction, 2–4× speedup.",
  "Pruning": "Removes weights or neurons with near-zero magnitude — structured pruning removes whole channels.",
  "Knowledge Distillation": "Small student network trained to match soft logits of a large teacher — compact, accurate.",
  "13. MLOps": "Engineering discipline for reliably deploying, monitoring, maintaining, and improving ML systems in production at scale.",
  "Data Versioning": "Tracking every change to datasets and pipeline configurations — reproducibility at the data layer.",
  "Experiment Tracking": "Logging hyperparameters, metrics, artifacts, and code versions for every training run.",
  "Model Registry": "Versioned, centralized catalog of trained models with metadata — manages the model lifecycle.",
  "Model Deployment": "Packaging and serving a trained model as a reliable, scalable prediction service.",
  "CI/CD for ML": "Automated pipelines that test, validate, and deploy ML code, data, and models on every commit.",
  "Model Monitoring": "Continuously tracking model behavior in production — detecting drift, errors, and regressions.",
  "Automated Retraining": "Triggering retraining pipelines when data drift or performance thresholds are breached.",
  "DVC": "Git extension for versioning large datasets and ML pipelines — stores data in remote storage, tracks metadata in Git.",
  "MLflow": "Open-source platform for tracking experiments, packaging models, and deploying them to any serving infrastructure.",
  "Weights & Biases": "Cloud-native experiment tracking with real-time dashboards, artifact management, and team collaboration.",
  "Flask": "Micro Python web framework — wrap a model's predict() function behind a REST endpoint in 20 lines.",
  "FastAPI": "ASGI Python framework with automatic OpenAPI docs, type validation, and async support — the ML serving standard.",
  "Docker": "Containerizes the model, runtime, and dependencies into a portable image that runs identically anywhere.",
  "Kubernetes": "Orchestrates container replicas across a cluster — handles auto-scaling, rolling updates, and self-healing.",
  "Cloud Deployment": "Managed ML serving on AWS SageMaker, GCP Vertex AI, or Azure ML — abstracts infrastructure completely.",
  "GitHub Actions": "Event-triggered workflows in YAML — run model tests, data validation, and deployment on every push.",
  "Jenkins": "Mature open-source automation server — highly configurable CI/CD pipelines for ML monorepos.",
  "GitLab CI/CD": "Deeply integrated pipelines in GitLab — merge request-gated model promotion with built-in container registry.",
  "Data Drift": "Statistical shift in the input distribution P(X) — feature means, variances, or correlations change over time.",
  "Model Drift": "Shift in the joint P(Y|X) — the relationship the model learned no longer matches the current world.",
  "Latency Monitoring": "Tracking p50/p95/p99 inference latency — alerting when SLAs are breached.",
  "Error Monitoring": "Capturing prediction errors, exceptions, and payload anomalies in production via structured logging.",
};

const REAL_WORLD = {
  "Machine Learning": { intel: "Every time Netflix recommends a movie, Google predicts your search, Instagram shows relevant content, or a self-driving car detects a pedestrian — ML is running silently in the background.", apps: ["🎬  Netflix & Spotify content recommendations", "🔍  Google Search ranking & query autocomplete", "🚗  Tesla Autopilot & Waymo self-driving", "💬  ChatGPT, Gemini & AI assistants", "🏥  Cancer detection & medical imaging AI", "💳  PayPal & Stripe fraud detection", "📦  Amazon demand forecasting & logistics", "🌤  Weather prediction & climate modeling"] },
  "1. Supervised Learning": { intel: "The engine behind most production ML systems — whenever you have historical examples with known outcomes, supervised learning turns them into a predictive engine.", apps: ["📧  Gmail spam filter (100B+ emails/day)", "🏠  Zillow Zestimate home price prediction", "🩺  Google DeepMind diabetic retinopathy screening", "💳  American Express credit risk scoring", "🎙  Apple Siri & Google Assistant voice recognition", "📈  Hedge fund algorithmic trading signals"] },
  "A. Regression": { intel: "Wherever a business needs a number — a price, a count, a duration, a probability — regression is the first tool reached for.", apps: ["🏠  Zillow property valuation engine", "✈️  Airline dynamic ticket pricing", "⚡  Smart grid electricity demand forecasting", "💰  Loan interest rate calculation", "🌡  Climate & temperature projection models"] },
  "B. Classification": { intel: "Classification drives nearly every binary or multi-class decision system — from your inbox to hospital triage.", apps: ["📧  Gmail spam vs. ham (99.9% accuracy)", "🩺  Skin cancer classification (dermatology AI)", "😊  Face unlock on iPhones & Android", "🌐  Google SafeSearch content filtering", "🏦  Mortgage approval / credit default prediction"] },
  "Linear Regression": { intel: "The workhorse of quantitative finance, economics, and business analytics — simple, auditable, and trusted in regulated industries.", apps: ["🏠  Real estate appraisal models", "📈  Stock return factor models (Fama-French)", "⚡  Energy utility load forecasting", "💊  Clinical trial dose-response modeling", "📊  Marketing mix modeling (ROI attribution)"] },
  "Random Forest Regression": { intel: "Trusted by Kaggle grandmasters and enterprises alike — robust to noise, handles mixed feature types, no scaling needed.", apps: ["🌾  USDA crop yield prediction", "🏥  ICU length-of-stay forecasting", "🛢  Oil & gas reservoir production modeling", "🎵  Spotify stream count prediction", "🚗  Used car price estimation (AutoTrader)"] },
  "XGBoost Regression": { intel: "Won more Kaggle competitions than any other algorithm — the default choice for structured/tabular prediction tasks.", apps: ["🏦  Lending Club loan default prediction", "🛒  Walmart sales forecasting (top Kaggle)", "🏥  Hospital readmission risk scoring", "✈️  Flight delay duration prediction", "🌊  Sea level rise climate models"] },
  "Logistic Regression": { intel: "Still used in production at Google, Facebook, and every major bank — interpretable, fast, and well-calibrated.", apps: ["🔍  Google ad click-through rate prediction", "🏦  Credit card fraud detection baseline", "🏥  Disease risk scoring (APACHE, SOFA)", "📰  News article topic classification", "🛒  Shopping cart abandonment prediction"] },
  "Random Forest Classifier": { intel: "The Swiss Army knife of ML — robust, accurate on nearly any dataset, and beloved by practitioners for its interpretability.", apps: ["🌿  Amazon Alexa wake-word detection", "🔬  Drug side-effect prediction (FDA)", "🛡  Cybersecurity intrusion detection", "🌾  Satellite land-cover classification", "📞  Telecom customer churn prediction"] },
  "Support Vector Machine": { intel: "The go-to for bioinformatics and small-sample medical classification — excellent generalization in high-dimensional spaces.", apps: ["🧬  Gene expression cancer classification", "✍️  Handwriting recognition (postal service)", "🖼  Early face detection (Viola-Jones successor)", "📡  Radar signal classification (military)", "💊  Drug-protein interaction prediction"] },
  "Neural Network Classifier": { intel: "The backbone of modern AI — from speech recognition to autonomous driving, it powers the systems that are changing every industry.", apps: ["🎙  Google Duplex phone call AI", "🤖  OpenAI GPT-4 intent classification", "🚦  Traffic sign recognition (self-driving)", "🌐  Cloudflare bot vs. human detection", "🏭  Industrial defect detection systems"] },
  "2. Unsupervised Learning": { intel: "Used whenever labeled data is too expensive, too slow, or simply doesn't exist — it finds structure in the raw noise of data.", apps: ["🧑‍🤝‍🧑  Airbnb neighborhood segmentation", "💳  Credit card transaction anomaly detection", "🧬  Single-cell RNA sequencing analysis", "🛒  Amazon market basket analysis", "🌐  Google News topic clustering"] },
  "K-Means Clustering": { intel: "One of the most widely deployed unsupervised algorithms — fast enough to run on billions of records.", apps: ["🎯  Facebook user segment targeting", "📦  UPS route zone clustering", "🏥  Patient cohort discovery from EHR", "📱  Image compression (color quantization)", "🌍  Seismic event clustering (geology)"] },
  "DBSCAN": { intel: "Excels at finding arbitrarily shaped clusters and natural anomalies — no need to guess K upfront.", apps: ["📍  GPS trajectory outlier detection (Uber)", "🌋  Earthquake epicenter clustering", "🛡  Network intrusion spatial detection", "🛒  Retail store traffic hotspot analysis", "🔭  Astronomical object clustering (NASA)"] },
  "PCA": { intel: "Used in nearly every data pipeline as a preprocessing step — reduces noise, speeds up training, enables visualization.", apps: ["🧬  1000 Genomes Project population structure", "📉  Quantitative finance factor models", "🖼  Eigenfaces face recognition (AT&T)", "🎵  Audio feature compression", "🔬  Mass spectrometry data reduction"] },
  "t-SNE": { intel: "The gold standard for visualizing high-dimensional embeddings — reveals cluster structure invisible in raw dimensions.", apps: ["🧬  Single-cell genomics visualization (10x Genomics)", "🤖  GPT embedding space exploration", "🎨  Neural network feature visualization", "💊  Drug molecular property mapping", "🌐  Wikipedia article semantic mapping"] },
  "Isolation Forest": { intel: "Deployed at scale in financial and cybersecurity systems — detects anomalies without needing labeled fraud examples.", apps: ["💳  Mastercard real-time fraud detection", "🔐  AWS CloudTrail security anomalies", "🏭  Semiconductor wafer defect detection", "⚡  Smart meter energy theft detection", "📡  Network packet anomaly detection"] },
  "4. Reinforcement Learning": { intel: "The technology behind AlphaGo, ChatGPT's RLHF alignment, robotic manipulation, and real-time bidding systems.", apps: ["♟  DeepMind AlphaGo & AlphaZero", "🤖  OpenAI ChatGPT RLHF fine-tuning", "🦾  Boston Dynamics robot locomotion", "⚡  Google DeepMind data center cooling (40% energy saved)", "📈  Jane Street algorithmic trading", "🎮  Meta Horizon Worlds NPC AI"] },
  "Q-Learning": { intel: "The theoretical foundation of DQN and all deep RL — still used in robotics and operations research.", apps: ["🎮  Classic Atari game AI baselines", "📦  Warehouse robot path planning", "🚦  Traffic signal timing optimization", "📡  Network routing protocols", "🔋  Battery charging schedule optimization"] },
  "Deep Q-Network": { intel: "DQN was the paper that proved deep RL works at scale — the starting point of the modern RL renaissance.", apps: ["🎮  Atari 2600 superhuman game play (DeepMind)", "🤖  Robotic arm manipulation tasks", "📱  Mobile ad bidding optimization", "🚗  Autonomous parking control", "⚕️  Radiation therapy treatment planning"] },
  "PPO": { intel: "The most widely used RL algorithm in production — stable, sample-efficient, and the default for fine-tuning LLMs.", apps: ["🤖  OpenAI ChatGPT RLHF (PPO stage)", "🦾  OpenAI Five Dota 2 AI", "✈️  Drone swarm control (DARPA)", "🏭  Industrial robot assembly", "🌐  Recommendation policy optimization"] },
  "SAC": { intel: "The leading algorithm for continuous control — maximizes reward AND entropy for robust real-world behavior.", apps: ["🦾  Agility Robotics bipedal locomotion", "✈️  Quadcopter flight control", "🚗  Formula 1 race strategy optimization", "🌡  HVAC building climate control", "⚡  Power grid load balancing"] },
  "5. Deep Learning": { intel: "The technology rewriting every field — from protein folding to code generation, from drug discovery to creative AI.", apps: ["🗣  OpenAI Whisper speech recognition", "🧬  AlphaFold2 protein structure prediction", "🎨  Stable Diffusion & Midjourney image gen", "💊  Insilico Medicine AI drug discovery", "🎵  Suno & Udio AI music generation", "🔬  DeepMind GraphCast weather forecasting"] },
  "CNN": { intel: "The architecture that solved computer vision — still the backbone of industrial quality inspection and medical imaging.", apps: ["📸  iPhone Face ID", "🏥  Viz.ai stroke detection from CT scans", "🚗  Tesla Autopilot lane and sign detection", "🏭  TSMC semiconductor defect inspection", "🔍  Google Lens visual search"] },
  "ResNet": { intel: "The breakthrough that made deep networks trainable — 152 layers, winner of ImageNet 2015, now in billions of devices.", apps: ["🏥  Medical image classification at hospital scale", "📸  Google Photos scene understanding", "🚗  Waymo pedestrian detection backbone", "🛡  Content moderation at Facebook/Instagram", "🔬  Scientific image analysis in biology"] },
  "Transformer": { intel: "The single most important architecture in modern AI — every major AI product from 2020 onward is built on it.", apps: ["💬  GPT-4, Claude, Gemini language models", "🎨  DALL·E 3 and Stable Diffusion XL", "🧬  ESMFold protein structure prediction", "🎵  MusicGen and AudioLM", "💊  MIT ChemBERTa molecular property prediction"] },
  "LSTM": { intel: "Still widely used in production for time series and speech — robust, interpretable, and efficient on edge devices.", apps: ["🎙  Google Translate speech input", "📈  JPMorgan LOXM trade execution AI", "⌨️  Google Keyboard next-word prediction", "🏥  ICU early warning score systems", "📡  Seismic waveform classification"] },
  "GANs": { intel: "Enabled a new era of synthetic media — from data augmentation to deepfakes to artistic creation.", apps: ["🎨  Adobe Firefly generative fill", "🏥  Medical image augmentation for rare diseases", "👗  NVIDIA GauGAN fashion design tool", "🎮  NVIDIA DLSS upscaling (real-time)", "🗺  Google Maps photo enhancement"] },
  "Diffusion Models": { intel: "The state-of-the-art in image, audio, and video generation — powering the most visually stunning AI tools.", apps: ["🎨  Stable Diffusion, DALL·E 3, Midjourney", "🎵  ElevenLabs voice cloning (audio diffusion)", "🎬  Runway Gen-2 video generation", "💊  RoseTTAFold protein design", "🧬  Genie world model (DeepMind)"] },
  "Large Language Models": { intel: "The most transformative technology since the internet — LLMs can write, code, reason, and operate autonomously.", apps: ["💬  ChatGPT (100M+ daily users)", "💻  GitHub Copilot AI code completion", "🔬  Google DeepMind Gemini 1.5 Pro", "📖  Anthropic Claude document analysis", "🧑‍⚕️  Nabla Copilot clinical note generation"] },
  "Retrieval-Augmented Generation": { intel: "The most practical way to give LLMs up-to-date, private knowledge — reducing hallucination and enabling enterprise AI.", apps: ["🔍  Perplexity AI real-time web search", "💼  Microsoft 365 Copilot on SharePoint", "🏥  Mayo Clinic clinical knowledge assistant", "💰  Bloomberg GPT on financial data", "🤖  Notion AI on user documents"] },
  "6. Natural Language Processing": { intel: "NLP is what allows AI to communicate in your language — powering every search engine, chatbot, and language assistant on earth.", apps: ["🔍  Google Search (BERT since 2019)", "📰  Reuters & Bloomberg automated news writing", "🏛  Legal discovery AI (Relativity, Kira)", "🌐  DeepL & Google Translate", "💬  Zendesk AI customer support automation"] },
  "BERT": { intel: "Revolutionized NLP — Google deployed BERT in Search for every English query in 2019, affecting 10% of all searches.", apps: ["🔍  Google Search query understanding (since 2019)", "⚕️  Clinical NLP at Mayo Clinic & Epic", "📧  Gmail Smart Reply and Smart Compose", "🏛  Patent similarity search (USPTO)", "💼  LinkedIn job-skill matching"] },
  "GPT": { intel: "The model family that democratized AI — from GPT-3 to GPT-4o, it changed how humans and computers interact forever.", apps: ["💬  ChatGPT (OpenAI flagship product)", "💻  GitHub Copilot (50M+ developers)", "📝  Jasper AI marketing copy generation", "🏥  Nuance DAX clinical documentation", "🎮  Inworld AI NPC dialogue systems"] },
  "Sentiment Analysis": { intel: "Used by every major brand to monitor reputation, understand customers, and respond to market sentiment in real time.", apps: ["📊  Brandwatch social media monitoring", "💹  Bloomberg terminal news sentiment signals", "🏨  TripAdvisor review sentiment scoring", "📞  Salesforce Einstein call sentiment AI", "🏦  BlackRock Aladdin portfolio risk sentiment"] },
  "Machine Translation": { intel: "Breaking down language barriers globally — billions of translations happen daily across enterprise and consumer platforms.", apps: ["🌐  Google Translate (500M+ daily users)", "🌍  DeepL business translation API", "🇺🇳  UN document translation systems", "🛒  Amazon cross-border seller listings", "✈️  Real-time airport signage translation"] },
  "7. Computer Vision": { intel: "Machines can now see as well as or better than humans in narrow tasks — transforming healthcare, manufacturing, agriculture, and security.", apps: ["🏥  Paige.AI cancer pathology diagnosis", "🏭  Foxconn visual quality inspection (Apple supply chain)", "🌾  John Deere crop disease detection", "🚗  Mobileye ADAS in 800M+ vehicles", "🔐  Face ID & airport facial recognition"] },
  "Image Classification": { intel: "The benchmark task that launched the deep learning revolution — ImageNet 2012 changed everything.", apps: ["📸  Google Photos auto-tagging", "🌿  iNaturalist plant & animal identification", "🏥  Google DeepMind eye disease screening", "🌾  PlantVillage crop disease detection", "♻️  AMP Robotics recycling material sorting"] },
  "Object Detection": { intel: "Enabling machines to count, locate, and track everything they see — from traffic to tumors.", apps: ["🚗  Waymo & Tesla pedestrian/vehicle detection", "🏪  Amazon Go cashierless checkout", "🛡  Palantir military target detection", "🌾  Blue River See & Spray precision herbicide", "🏥  Arterys cardiac MRI lesion detection"] },
  "Image Segmentation": { intel: "Pixel-perfect understanding that enables surgical precision in autonomous systems and medical tools.", apps: ["🚗  Waymo semantic scene parsing", "🏥  Butterfly Network ultrasound segmentation", "🌆  HERE Maps road surface analysis", "🎨  Adobe Photoshop AI Select Subject", "🌾  Indigo Ag satellite crop field mapping"] },
  "Face Recognition": { intel: "Deployed at massive scale for security, payments, and personalization — also one of the most controversial AI applications.", apps: ["📱  Apple Face ID (1B+ iPhones)", "🔐  Clearview AI law enforcement", "✈️  TSA biometric boarding at major US airports", "💰  Alipay smile-to-pay payments", "🏟  NEC stadium & venue access control"] },
  "YOLO": { intel: "Real-time object detection on commodity hardware — democratized computer vision for edge and embedded systems.", apps: ["🏭  Siemens factory floor safety monitoring", "🚁  DJI drone autonomous obstacle avoidance", "🐟  Marine biology fish population counting", "🔐  Security camera perimeter intrusion", "🏀  SportVU player tracking in NBA arenas"] },
  "8. Time Series ML": { intel: "Anywhere data has a temporal dimension — finance, energy, manufacturing, healthcare — time series ML is the analytical core.", apps: ["📈  Two Sigma & Renaissance Technologies quant trading", "⚡  National Grid electricity demand forecasting", "🏭  GE Predix industrial equipment predictive maintenance", "🌡  Climate TRACE greenhouse gas emissions tracking", "🏥  Philips patient vital sign early warning systems"] },
  "ARIMA": { intel: "The classic statistical baseline that outperforms deep learning on short, stationary economic series.", apps: ["📉  Federal Reserve economic indicator forecasting", "🏪  Walmart weekly SKU inventory planning", "✈️  FAA air traffic volume forecasting", "💊  Hospital pharmacy medication demand", "🌧  Rainfall runoff hydrological modeling"] },
  "Prophet": { intel: "Facebook open-sourced it internally for business metric forecasting — now used by thousands of companies.", apps: ["📈  Meta internal KPI forecasting at scale", "🛒  Etsy seasonal sales prediction", "🌐  Wikimedia Foundation Wikipedia traffic", "🏥  NHS hospital bed occupancy forecasting", "✈️  Airbnb booking demand forecasting"] },
  "9. Recommendation Systems": { intel: "The invisible hand guiding discovery on every platform — responsible for 35% of Amazon revenue and 80% of Netflix views.", apps: ["🎬  Netflix movie recommendations (80% of views)", "🛒  Amazon 'Frequently Bought Together' (35% revenue)", "🎵  Spotify Discover Weekly (2.3B streams/week)", "📱  TikTok For You Page algorithm", "🔍  YouTube next video autoplay", "🎮  Steam game recommendations"] },
  "Collaborative Filtering": { intel: "The core of Netflix, Spotify, and Amazon recommendations — collective wisdom of millions driving individual discovery.", apps: ["🎬  Netflix cinematch algorithm (original)", "🎵  Pandora Music Genome Project", "📚  Goodreads book recommendations", "🛒  eBay similar items", "🎮  Xbox Game Pass discovery engine"] },
  "Matrix Factorization": { intel: "Won the Netflix Prize ($1M) in 2009 — the mathematical breakthrough that made modern recommender systems possible.", apps: ["🎬  Netflix Prize-winning algorithm (SVD++)", "🎵  Spotify collaborative playlist embeddings", "📰  Google News article recommendations", "💼  LinkedIn job-skill inference", "🛒  Alibaba product embedding for Taobao"] },
  "10. Model Evaluation": { intel: "Without rigorous evaluation, you're flying blind — proper metrics are what separate production-grade ML from hobby projects.", apps: ["🏥  FDA AI device approval requires AUC thresholds", "💳  FICO score model validation (regulatory)", "🤖  LLM benchmark suites (MMLU, HumanEval)", "🏦  Basel III model risk management", "🔬  Clinical trial ML endpoint validation"] },
  "ROC-AUC": { intel: "The universal currency for binary classifier comparison — threshold-free and scale-invariant.", apps: ["🏥  FDA digital health AI performance reporting", "💳  Credit bureau model validation", "🛡  Cybersecurity threat model ranking", "🔬  Drug biomarker discovery ranking", "📉  Financial default model regulatory audit"] },
  "11. Feature Engineering": { intel: "The craft that separates a mediocre model from a great one — domain knowledge encoded into features often beats algorithmic sophistication.", apps: ["💹  Quantitative trading alpha factor research", "🏥  Epic Systems EHR feature pipelines", "🛒  Wayfair furniture recommendation features", "🚗  Uber pricing surge feature engineering", "✈️  Airline no-show probability features"] },
  "12. Model Optimization": { intel: "Production ML demands more than raw accuracy — speed, memory, and robustness determine whether a model ships or stays in the lab.", apps: ["📱  Apple Neural Engine optimization for iPhone", "🔍  Google Search model distillation at scale", "💬  OpenAI GPT-4 quantization for API efficiency", "🚗  Mobileye INT8 ADAS inference on-chip", "🎵  Spotify real-time recommendation latency"] },
  "Dropout": { intel: "One of the simplest and most effective regularization tricks — introduced by Hinton in 2012, now in virtually every deep network.", apps: ["🤖  Used in all major LLMs during training", "🏥  Medical imaging CNN regularization", "🎙  Speech recognition acoustic models", "🎨  Generative model training stability", "🔬  Scientific deep learning models"] },
  "Knowledge Distillation": { intel: "Makes massive models deployable on phones and edge devices — the technology behind tiny but smart on-device AI.", apps: ["📱  Apple's on-device Siri (distilled from large model)", "🔍  DistilBERT — 60% smaller, 97% of BERT accuracy", "🚗  Mobileye embedded chip inference", "📷  Google Lens on-device processing", "🎙  Amazon Alexa edge wake-word detection"] },
  "13. MLOps": { intel: "The difference between a model that works on a laptop and one that serves millions of users reliably — MLOps is production-grade ML.", apps: ["🚀  Uber Michelangelo ML platform (10K+ models)", "🔍  Airbnb Bighead ML infrastructure", "💳  Stripe ML serving platform (fraud detection)", "📦  DoorDash delivery time prediction pipeline", "🎵  Spotify Luigi ML workflow orchestration"] },
  "Docker": { intel: "The container revolution hit ML hard — every major ML team now ships models as Docker images.", apps: ["🐳  AWS SageMaker container-based training", "🔍  Google Vertex AI custom containers", "🤖  Hugging Face model deployment containers", "🚀  SpaceX on-board inference systems", "🏭  Industrial MLOps at Siemens & GE"] },
  "Kubernetes": { intel: "Auto-scaling inference infrastructure — the reason AI services survive viral traffic spikes.", apps: ["🤖  OpenAI API serving infrastructure (k8s)", "🔍  Spotify ML platform serving layer", "💳  Stripe payment ML at scale", "🌐  LinkedIn AI serving (Quasar platform)", "📦  Kubeflow ML pipeline orchestration"] },
  "Model Monitoring": { intel: "Models degrade silently in production — monitoring is what keeps production AI trustworthy over time.", apps: ["💳  Fraud model drift detection at banks", "🏥  Clinical AI performance surveillance (FDA mandate)", "🚗  Tesla Autopilot OTA model performance tracking", "🔍  Search ranking quality monitoring", "📱  App Store review sentiment drift detection"] },
  "Cross Validation": { intel: "The gold standard of model selection — prevents the costly mistake of choosing a model that only works on your test set.", apps: ["🏥  Clinical prediction model validation (TRIPOD)", "🏦  Basel III banking model validation", "🔬  Genomic biomarker selection studies", "📊  Nielsen marketing mix model validation", "🎯  A/B test pre-experiment power analysis"] },
};

const getFallback = (name) => ({
  intel: `${name} is actively applied across industries including healthcare, finance, autonomous systems, and enterprise AI — enabling smarter, faster, and more accurate decision-making at scale.`,
  apps: ["🏥  Healthcare diagnostic AI systems", "💳  Financial risk & fraud detection", "🤖  Autonomous vehicle perception", "🔍  Enterprise search & recommendation", "🏭  Industrial quality inspection"],
});
const getRW = (name) => REAL_WORLD[name] || getFallback(name);

const ML_TREE = {
  name: "Machine Learning",
  children: [
    { name: "1. Supervised Learning", children: [
      { name: "A. Regression", children: ["Linear Regression","Polynomial Regression","Ridge Regression","Lasso Regression","ElasticNet Regression","Decision Tree Regression","Random Forest Regression","Gradient Boosting Regression","XGBoost Regression","LightGBM Regression","Support Vector Regression"] },
      { name: "B. Classification", children: ["Logistic Regression","K-Nearest Neighbors","Naive Bayes","Decision Tree Classifier","Random Forest Classifier","Support Vector Machine","Gradient Boosting Classifier","XGBoost Classifier","LightGBM Classifier","CatBoost Classifier","Neural Network Classifier"] }
    ]},
    { name: "2. Unsupervised Learning", children: [
      { name: "A. Clustering", children: ["K-Means Clustering","Hierarchical Clustering","DBSCAN","Mean Shift Clustering","Gaussian Mixture Models","Spectral Clustering"] },
      { name: "B. Dimensionality Reduction", children: ["PCA","t-SNE","UMAP","LDA","Autoencoders","Feature Selection"] },
      { name: "C. Association Rule Learning", children: ["Apriori Algorithm","FP-Growth","Eclat Algorithm"] },
      { name: "D. Anomaly Detection", children: ["Isolation Forest","One-Class SVM","Local Outlier Factor","Autoencoder-Based Detection","Statistical Outlier Detection"] }
    ]},
    { name: "3. Semi-Supervised Learning", children: ["Self-Training","Label Propagation","Label Spreading","Pseudo Labeling","Semi-Supervised Deep Learning"] },
    { name: "4. Reinforcement Learning", children: [
      { name: "A. Value-Based Methods", children: ["Q-Learning","Deep Q-Network","Double DQN"] },
      { name: "B. Policy-Based Methods", children: ["Policy Gradient","REINFORCE","Actor-Critic"] },
      { name: "C. Model-Based RL", children: ["Planning-Based RL","Environment Model Learning"] },
      { name: "D. Advanced RL", children: ["PPO","A3C","DDPG","SAC","Multi-Agent RL"] }
    ]},
    { name: "5. Deep Learning", children: [
      { name: "A. Artificial Neural Networks", children: ["Perceptron","Multi-Layer Perceptron","Feedforward Neural Network"] },
      { name: "B. Computer Vision Models", children: ["CNN","ResNet","VGG","Inception","EfficientNet","YOLO","Faster R-CNN","Vision Transformer"] },
      { name: "C. Sequence Models", children: ["RNN","LSTM","GRU","Transformer"] },
      { name: "D. Generative Models", children: ["Autoencoders","Variational Autoencoders","GANs","Diffusion Models","Large Language Models"] },
      { name: "E. Transfer Learning", children: ["Pretrained Models","Fine-Tuning","Feature Extraction","Foundation Models"] }
    ]},
    { name: "6. Natural Language Processing", children: [
      { name: "Text Preprocessing", children: ["Tokenization","Stopword Removal","Stemming","Lemmatization","Text Cleaning"] },
      { name: "Text Representation", children: ["Bag of Words","TF-IDF","Word2Vec","GloVe","FastText","Embeddings"] },
      { name: "NLP Tasks", children: ["Sentiment Analysis","Text Classification","Named Entity Recognition","Machine Translation","Question Answering","Text Summarization","Chatbots"] },
      { name: "Modern NLP", children: ["Transformers","BERT","GPT","T5","LLaMA","Retrieval-Augmented Generation"] }
    ]},
    { name: "7. Computer Vision", children: ["Image Classification","Object Detection","Image Segmentation","Face Recognition","OCR","Pose Estimation","Image Generation","Video Analysis"] },
    { name: "8. Time Series ML", children: ["Time Series Forecasting","ARIMA","SARIMA","Prophet","LSTM Forecasting","Temporal Convolutional Networks","Transformer Forecasting","Anomaly Detection in Time Series"] },
    { name: "9. Recommendation Systems", children: ["Content-Based Filtering","Collaborative Filtering","Matrix Factorization","Hybrid Recommendation","Neural Recommendation Systems","Ranking Models"] },
    { name: "10. Model Evaluation", children: [
      { name: "Classification Metrics", children: ["Accuracy","Precision","Recall","F1-Score","Confusion Matrix","ROC-AUC","Log Loss"] },
      { name: "Regression Metrics", children: ["MAE","MSE","RMSE","R² Score","MAPE"] },
      { name: "Clustering Metrics", children: ["Silhouette Score","Davies-Bouldin Index","Inertia"] }
    ]},
    { name: "11. Feature Engineering", children: [
      "Handling Missing Values",
      { name: "Encoding Categorical Data", children: ["Label Encoding","One-Hot Encoding","Target Encoding"] },
      { name: "Feature Scaling", children: ["Standardization","Normalization","Robust Scaling"] },
      "Feature Selection","Feature Extraction","Outlier Handling","Data Transformation"
    ]},
    { name: "12. Model Optimization", children: [
      { name: "Hyperparameter Tuning", children: ["Grid Search","Random Search","Bayesian Optimization","Optuna"] },
      { name: "Regularization", children: ["L1 Regularization","L2 Regularization","Dropout"] },
      "Cross Validation","Early Stopping",
      { name: "Ensemble Learning", children: ["Bagging","Boosting","Stacking"] },
      { name: "Model Compression", children: ["Quantization","Pruning","Knowledge Distillation"] }
    ]},
    { name: "13. MLOps", children: [
      { name: "Data Versioning", children: ["DVC"] },
      { name: "Experiment Tracking", children: ["MLflow","Weights & Biases"] },
      "Model Registry",
      { name: "Model Deployment", children: ["Flask","FastAPI","Docker","Kubernetes","Cloud Deployment"] },
      { name: "CI/CD for ML", children: ["GitHub Actions","Jenkins","GitLab CI/CD"] },
      { name: "Model Monitoring", children: ["Data Drift","Model Drift","Latency Monitoring","Error Monitoring"] },
      "Automated Retraining"
    ]}
  ]
};

function findParentColor(name, node, parentColor) {
  if (node.name === name) return parentColor || getColor(node.name);
  if (!node.children) return null;
  for (const child of node.children) {
    const childName = typeof child === "string" ? child : child.name;
    const childColor = typeof child === "string" ? parentColor : getColor(child.name, parentColor);
    if (childName === name) return childColor;
    if (typeof child !== "string") {
      const found = findParentColor(name, child, childColor);
      if (found) return found;
    }
  }
  return null;
}

function TreeNode({ node, depth, selectedName, onSelect, inheritedColor }) {
  const isString = typeof node === "string";
  const name = isString ? node : node.name;
  const hasChildren = !isString && node.children && node.children.length > 0;
  const [open, setOpen] = useState(depth < 1);
  const accent = isString ? inheritedColor : (getColor(name, inheritedColor));
  const isSelected = selectedName === name;

  const handleClick = () => {
    if (hasChildren) setOpen(o => !o);
    onSelect(name, accent);
  };

  const nodeStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: depth === 0 ? "10px 16px" : depth === 1 ? "7px 16px" : depth === 2 ? "5px 16px" : "4px 16px",
    cursor: "pointer",
    borderRadius: 4,
    marginBottom: 1,
    background: isSelected ? `${accent}18` : "transparent",
    borderLeft: isSelected ? `2px solid ${accent}` : "2px solid transparent",
    transition: "background 0.15s, border-color 0.15s",
  };

  return (
    <div>
      <div style={nodeStyle} onClick={handleClick}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0, opacity: isSelected ? 1 : 0.6 }} />
        <span style={{
          color: "#ffffff",
          fontSize: depth === 0 ? 15 : depth === 1 ? 13.5 : depth === 2 ? 12.5 : 12,
          fontWeight: depth === 0 ? 600 : depth === 1 ? 500 : depth === 2 ? 400 : 400,
          fontFamily: depth >= 2 ? "'JetBrains Mono', 'Fira Code', monospace" : "inherit",
          letterSpacing: depth === 0 ? "0.02em" : "0",
          flex: 1,
          lineHeight: 1.4,
        }}>
          {name}
        </span>
        {hasChildren && (
          <span style={{ color: "#ffffff", opacity: 0.3, fontSize: 10, fontFamily: "monospace", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
        )}
      </div>
      {hasChildren && open && (
        <div style={{ paddingLeft: depth === 0 ? 16 : 14, borderLeft: `1px solid ${accent}22`, marginLeft: 14 }}>
          {node.children.map((child, i) => (
            <TreeNode
              key={typeof child === "string" ? child : child.name + i}
              node={child}
              depth={depth + 1}
              selectedName={selectedName}
              onSelect={onSelect}
              inheritedColor={accent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailPanel({ name, accent }) {
  const panelRef = useRef(null);
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [name]);

  if (!name) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 22, opacity: 0.25 }}>⬡</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.1em", textAlign: "center" }}>SELECT A NODE<br/>TO EXPLORE</p>
      </div>
    );
  }

  const def = DEFINITIONS[name];
  const rw = getRW(name);

  return (
    <div ref={panelRef} style={{ padding: "28px 24px", overflowY: "auto", height: "100%", boxSizing: "border-box" }}>
      {/* Top accent line */}
      <div style={{ height: 2, background: accent, borderRadius: 1, marginBottom: 22, opacity: 0.85 }} />

      {/* Name */}
      <h2 style={{ color: "#ffffff", fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{name}</h2>

      {/* Category tag */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${accent}1a`, border: `1px solid ${accent}40`, borderRadius: 4, padding: "3px 10px", marginBottom: 18 }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
        <span style={{ color: accent, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: 600 }}>ML ALGORITHM</span>
      </div>

      {/* Definition */}
      {def && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 8, textTransform: "uppercase" }}>Definition</p>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>{def}</p>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />

      {/* Real-World Intelligence */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>Real-World Intelligence</p>
        <div style={{ background: `${accent}0d`, border: `1px solid ${accent}2a`, borderRadius: 6, padding: "14px 16px" }}>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{rw.intel}"</p>
        </div>
      </div>

      {/* Live Applications */}
      <div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>Where ML Exists Today</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {rw.apps.map((app, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6, padding: "9px 12px",
            }}>
              <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{app.split("  ")[0]}</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12.5, lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace" }}>
                {app.split("  ").slice(1).join("  ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: 24 }} />
    </div>
  );
}

export default function MLUniverse() {
  const [selected, setSelected] = useState(null);
  const [accent, setAccent] = useState("#60e4d4");
  const [search, setSearch] = useState("");

  const handleSelect = (name, color) => {
    setSelected(name);
    setAccent(color || getColor(name));
  };

  const filterTree = (node, q) => {
    if (!q) return node;
    const isString = typeof node === "string";
    const name = isString ? node : node.name;
    if (name.toLowerCase().includes(q.toLowerCase())) return node;
    if (isString) return null;
    const filtered = (node.children || []).map(c => filterTree(c, q)).filter(Boolean);
    if (filtered.length === 0) return null;
    return { ...node, children: filtered };
  };

  const displayTree = search ? filterTree(ML_TREE, search) : ML_TREE;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", width: "100%",
      background: "#07090e",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      color: "#ffffff",
      overflow: "hidden",
    }}>
      {/* ── HEADER */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#0a0c12",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {["#60e4d4","#b48ef5","#f0c94a","#f07080","#4ecf9a"].map((c,i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Machine Learning Universe</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "monospace" }}>// 13 domains · 150+ algorithms</span>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search algorithms..."
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: "6px 12px 6px 32px",
              color: "#ffffff",
              fontSize: 12,
              width: 200,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>⌕</span>
        </div>
      </div>

      {/* ── BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT: Tree */}
        <div style={{
          width: "55%", overflowY: "auto", padding: "16px 8px 16px 12px",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>
          {displayTree ? (
            <TreeNode
              node={displayTree}
              depth={0}
              selectedName={selected}
              onSelect={handleSelect}
              inheritedColor="#60e4d4"
            />
          ) : (
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, padding: 20, fontFamily: "monospace" }}>No results for "{search}"</div>
          )}
        </div>

        {/* RIGHT: Detail Panel */}
        <div style={{
          width: "45%",
          background: "#090b10",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          <DetailPanel name={selected} accent={accent} />
        </div>
      </div>

      {/* ── FOOTER */}
      <div style={{
        padding: "8px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "#0a0c12",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em" }}>
          {selected ? `SELECTED: ${selected.toUpperCase()}` : "CLICK ANY NODE TO EXPLORE"}
        </span>
        <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 10, fontFamily: "monospace" }}>ML UNIVERSE v2.0</span>
      </div>

      <style>{`
        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-color: rgba(255,255,255,0.25) !important; }
      `}</style>
    </div>
  );
}
