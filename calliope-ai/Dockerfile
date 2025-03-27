FROM python:3.10

RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirement.txt
RUN python3 setup.py

EXPOSE 8000
CMD ["python", "app.py"]