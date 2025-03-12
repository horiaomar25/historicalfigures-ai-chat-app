# Use the official Python image from the Docker Hub
FROM python:3.9-slim AS fastapi

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Rasa service (using the Rasa official Docker image)
FROM rasa/rasa:latest-full AS rasa

# Expose the necessary port for Rasa
EXPOSE 5005

# Set working directory for Rasa
WORKDIR /app

# Copy the backend files into the Rasa container
COPY ./backend /app

# Command to run the Rasa server
CMD ["rasa", "run", "--enable-api", "--cors", "*"]

