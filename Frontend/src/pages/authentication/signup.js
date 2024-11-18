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

const Signup = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true); // Start loading

    try {
      const obj = {
        username,
        email,
        password,
      };

      const { success } = await register(obj); // Register returns a success message
      if (success) {
        toast.success("Registered successfully!");
        navigate("/signin");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration");
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
        backgroundColor: "#f7f7f7",
        padding: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}
        >
          Create an Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginBottom: 3, color: "#666" }}
        >
          Join us and start your journey today.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              "Sign Up"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: 3,
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: "#4caf50",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signin")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
