import React, { useEffect, useState } from "react";

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = () => {
      fetch("http://localhost:8000/metrics") // We'll use Docker networking, backend container exposes 8000
        .then((res) => res.json())
        .then((data) => setMetrics(data))
        .catch((err) => console.error("Error fetching metrics:", err));
    };

    fetchMetrics(); // Initial fetch
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>System Metrics Dashboard</h1>
      {metrics ? (
        <ul>
          <li>CPU Usage: {metrics.cpu_usage}%</li>
          <li>Memory Usage: {metrics.memory_usage} MB</li>
          <li>Latency: {metrics.latency_ms} ms</li>
          <li>Request Count: {metrics.request_count}</li>
        </ul>
      ) : (
        <p>Loading metrics...</p>
      )}
    </div>
  );
}

export default App;
