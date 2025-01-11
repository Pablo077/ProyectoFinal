import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { LoginViews } from "../views/Login/LoginViews";

export const Login = () => {
  return (
    <div>
      <Navbar />
      <div style={{ color: "white", marginTop: "80px" }}>
        <LoginViews />
      </div>

      <Footer />
    </div>
  );
};
