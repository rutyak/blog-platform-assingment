import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { success } = await login({ email, password });

      if (success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafa",
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 1,
          }}
        >
          Welcome to Blog Platform
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            marginBottom: 3,
          }}
        >
          Sign In to Get Started.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email *"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            id="password"
            label="Password *"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            disabled={loading}
            sx={{
              padding: 1.5,
              fontWeight: "bold",
              backgroundColor: "#4caf50",
              borderRadius: "30px",
              "&:hover": { backgroundColor: "#43a047" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{
            marginTop: 3,
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              color: "#4caf50",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            marginTop: 3,
            color: "#999",
          }}
        >
          We never share your information with anyone; we only collect
          information to suggest relevant content.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signin;
