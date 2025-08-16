# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use "*" for dev; later you can restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

counter = 0

@app.get("/metrics")
def get_metrics():
    global counter
    counter += 1
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().used / (1024 * 1024)  # MB
    latency = round(time.perf_counter() * 1000) % 100  # simulated latency
    return {
        "cpu_usage": cpu,
        "memory_usage": round(memory, 2),
        "latency_ms": latency,
        "request_count": counter
    }
