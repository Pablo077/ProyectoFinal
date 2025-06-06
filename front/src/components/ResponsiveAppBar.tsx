import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { colores, coloresDesignados } from "../styles/colors";

import logo11 from "../assets/logo11.jpeg";
import { Buttons } from "./Buttons";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../utils/utils";


const items = [
  {
    pages: "Crear cuenta",
    href: "/Register",
  },
  {
    pages: "Iniciar sesión",
    href: "/Login",
  },
  {
    pages: "Agregar producto",
    href: "/IngresarProductos",
  },
  {
    pages: "Cerrar sesión",
    href: "/",
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [apiData, setApiData] = useState<any>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const cerrarSesion = () => {
    deleteCookie("user");
  };

  const letrasNombres = (nombre: string) => {
    if (!nombre) return "";

    const palabras = nombre.trim().split(/\s+/); 

    if (palabras.length === 1) {
      return palabras[0].charAt(0).toUpperCase(); 
    } else {
      return (palabras[0].charAt(0) + palabras[1].charAt(0)).toUpperCase(); 
    }
  };

  useEffect(() => {
    // Obtener la respuesta de la API de las cookies
    const cookieData = getCookie("user");
    if (cookieData) {
      // Convertir la cadena JSON en un objeto
      const parsedData = JSON.parse(cookieData);
      setApiData(parsedData);
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: colores.CornflowerBlue, color: colores.PennBlue }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a style={{ textDecoration: "none" }} href="/">
            <img src={logo11} width={"50px"} />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: colores.PennBlue,
              textDecoration: "none",
              fontSize: "16px",
              marginLeft: "5px",
              marginTop: "32px",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Conduce tu libertad, nosotros ponemos las ruedas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {apiData?.rol === "ADMIN" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    href={items[2].href}
                    component="a"
                    color={colores.AntiFlashWhite}
                    sx={{ textDecoration: 'none' }}
                  >
                    {items[2].pages}
                  </Typography>
                </MenuItem>
              )}
              {apiData ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    href={items[3].href}
                    component="a"
                    color={colores.AntiFlashWhite}
                    sx={{ textDecoration: 'none' }}
                  >
                    {items[3].pages}
                  </Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      href={items[0].href}
                      component="a"
                      color={colores.AntiFlashWhite}
                      sx={{ textDecoration: 'none' }}
                    >
                      {items[0].pages}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      href={items[1].href}
                      component="a"
                      color={colores.AntiFlashWhite}
                      sx={{ textDecoration: 'none' }}
                    >
                      {items[1].pages}
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            Conduce tu libertad, nosotros ponemos las ruedas
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {apiData?.rol === "ADMIN" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Buttons
                  variant="contained"
                  href={items[2].href}
                  text={items[2].pages}
                  styles={{
                    backgroundColor: colores.PennBlue,
                    color: colores.CornflowerBlue,
                    marginRight: "40px",
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            {apiData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Contenedor para el nombre y el avatar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>
                    <h3>{apiData.firstname}</h3>
                  </div>

                  <Avatar
                    sx={{
                      backgroundColor: coloresDesignados.Fondo,
                      color: coloresDesignados.Letra,
                    }}
                    alt={apiData.firstname}
                  >
                    {letrasNombres(apiData.firstname)}
                  </Avatar>
                </div>

                {/* Botón de cerrar sesión */}
                <div>
                  <Buttons
                    variant="contained"
                    href={items[3].href}
                    text={items[3].pages}
                    onClick={cerrarSesion}
                    styles={{
                      backgroundColor: colores.PennBlue,
                      color: colores.CornflowerBlue,
                      fontSize: "10px",
                      padding: "2px 10px 2px 10px",
                      marginBottom: "2px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <Buttons
                  variant="contained"
                  href={items[0].href}
                  text={items[0].pages}
                  styles={{
                    backgroundColor: colores.PennBlue,
                    color: colores.CornflowerBlue,
                  }}
                />
                <Buttons
                  variant="contained"
                  href={items[1].href}
                  text={items[1].pages}
                  styles={{
                    marginLeft: "10px",
                    backgroundColor: colores.PennBlue,
                    color: colores.CornflowerBlue,
                  }}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
