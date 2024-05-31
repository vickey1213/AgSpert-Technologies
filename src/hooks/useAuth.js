import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      navigate("/active-orders");
    } else {
      alert("Invalid credentials");
    }
  };

  return { isAuthenticated, login };
}
