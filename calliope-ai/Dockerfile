FROM python:3.10

# Installer ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier d'abord les fichiers de dépendances pour tirer parti du cache
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Puis copier le reste de l'application
COPY . .

# Si setup.py est nécessaire (par exemple pour un package), précisez install
RUN python setup.py install

EXPOSE 8000

CMD ["python", "app.py"]
