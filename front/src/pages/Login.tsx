import { Box, Typography } from "@mui/material";
import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { LoginViews } from "../views/Login/LoginViews";

export const Login = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <LoginViews />
      </Box>
      <Footer />
    </>
  );
};
