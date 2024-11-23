import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Container,
  Tooltip,
  IconButton,
  Switch,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import { useSpring, animated } from "react-spring"; // For animations

function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark Mode State

  // Animation for metadata and download link visibility
  const fadeIn = useSpring({
    opacity: metadata || downloadLink ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".docx")) {
      setFile(selectedFile);
      setError(""); // Clear previous errors
    } else {
      setError("Only .docx files are allowed!");
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file before uploading!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:5000/upload", formData)
      .then((response) => {
        setLoading(false);
        setMetadata(response.data.metadata);
        setDownloadLink(
          `http://127.0.0.1:5000/download/${file.name.split(".")[0]}.pdf`
        );
      })
      .catch(() => {
        setLoading(false);
        setError("File upload failed. Please check the backend.");
      });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        backgroundColor: darkMode ? "#121212" : "#f5f5f5", // Dark mode styling
        transition: "background-color 0.3s",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, color: darkMode ? "#bbdefb" : "#1976d2" }}
      >
        Word to PDF Converter
      </Typography>

      {/* Dark Mode Switch */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Tooltip title="Toggle Dark Mode">
          <IconButton onClick={toggleDarkMode}>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Upload Section with Tooltip */}
      <Card
        sx={{
          mb: 3,
          p: 3,
          backgroundColor: darkMode ? "#333333" : "#e3f2fd",
        }}
      >
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Upload a Word Document to convert it to PDF.
          </Typography>
          <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            inputProps={{ accept: ".docx" }}
            sx={{ mb: 2 }}
            variant="outlined"
          />
          <Tooltip title="Click to Upload" arrow>
            <Button
              startIcon={<FileUploadIcon />}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={loading}
              sx={{ py: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
            </Button>
          </Tooltip>
        </CardContent>
      </Card>

      {/* Error Alert Box */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Metadata Section with Animation */}
      {metadata && (
        <animated.div style={fadeIn}>
          <Card
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: darkMode ? "#424242" : "#fff9c4",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                File Metadata
              </Typography>
              <Typography variant="body1">
                <strong>Author:</strong> {metadata.author || "Unknown"}
              </Typography>
              <Typography variant="body1">
                <strong>Title:</strong> {metadata.title || "Untitled"}
              </Typography>
              <Typography variant="body1">
                <strong>Word Count:</strong> {metadata.word_count}
              </Typography>
            </CardContent>
          </Card>
        </animated.div>
      )}

      {/* Download Section with Animation */}
      {downloadLink && (
        <animated.div style={fadeIn}>
          <Grid container justifyContent="center">
            <Card
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: darkMode ? "#388e3c" : "#c8e6c9",
                width: "100%",
                maxWidth: 300,
              }}
            >
              <CardContent>
                <Button
                  startIcon={<DownloadIcon />}
                  variant="contained"
                  color="success"
                  href={downloadLink}
                  download
                  sx={{ width: "100%" }}
                >
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </animated.div>
      )}
    </Container>
  );
}

function RoutesSetup() {
  return (
    <Router>
      <Routes>
        {/* Route for homepage */}
        <Route path="/" element={<App />} />
        {/* You can add more routes if you have other pages */}
      </Routes>
    </Router>
  );
}

export default RoutesSetup;
