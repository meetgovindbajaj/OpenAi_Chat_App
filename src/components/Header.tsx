import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../utils/useAuth";
import NavLink from "./shared/NavLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(5rem)",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                to="/login"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                to="/signup"
                text="Sign Up"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
