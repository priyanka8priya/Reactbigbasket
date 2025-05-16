import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pagenotfound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/Home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="not-found-container" style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404 - Page Not Found</h1>
    <img src="/image/pagenotfound.jpg" alt="Page Not Found" width={200} style={{ marginBottom: "1rem" }} />
      <p>You will be redirected to the homepage in <strong>{countdown}</strong> seconds...</p>
    </div>
  );
}

export default Pagenotfound;
