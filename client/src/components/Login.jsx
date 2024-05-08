import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "state/api";
import { useSelector } from "react-redux";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
  maxWidth: 400,
  width: "100%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  const handleLogin = () => {
    // Check if data is loaded
    if (!data) {
      setError("User data not available");
      return;
    }

    // Compare entered email and password with fetched data
    if (email === data.email && password === data.password) {
      // Authentication successful, redirect to dashboard
      navigate("/dashboard");
    } else {
      // Authentication failed, display error message
      setError("Invalid email or password");
    }
  };

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <StyledTextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <StyledErrorText>{error}</StyledErrorText>}
        <StyledButton variant="contained" color="primary" onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default Login;
