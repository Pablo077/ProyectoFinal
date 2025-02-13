import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { Box } from "@mui/material";
import { RegisterViews } from "../views/Register/RegisterViews";


export const Register = () => {
  return (
    <>
     <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <RegisterViews />
      </Box>
      <Footer />
    </>
  );
};
