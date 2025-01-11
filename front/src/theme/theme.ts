
import { ThemeOptions, createTheme } from "@mui/material";
import { coloresDesignados } from "../styles/colors";

export const themeDriver: ThemeOptions = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: coloresDesignados.Letra,
          backgroundColor: coloresDesignados.Fondo,
        },
      },
    },

    //Color fondo lista
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: coloresDesignados.Fondo,
        },
      },
    },
    //Palabra centro
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: coloresDesignados.Letra,
          fontWeight: "bold",
          fontSize: "15px",
        },
      },
    },

    //Border del input
    //antes MuiTextField
    MuiFormControl: {
      styleOverrides: {
        root: {
        
          //Label de arriba cuando hace foco
          "& label.Mui-focused": {
            color: "white",
            fontSize: "14px",
          },
          "& .MuiOutlinedInput-root": {
            //Linea input limpia
            "& fieldset": {
              borderColor: "white",
            },
            //Linea cuando se hace hover
            "&:hover fieldset": {
              borderColor: "white",
            },
            //Linea cuando se hace foco en input
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
            //Texto input cuando se sale de foco y se selecciona una lista.
            "& .MuiOutlinedInput-input": {
              boxShadow: `0 0 0 100px ${"white"} inset`,
              textFillColor: "white",
            },
          },

          //Palabra seleccionada en input
          // "& .MuiInputBase-root": {
          //   fontSize: "20px",
          //   color: ColoresInputFondoOscuro.PalabraCentro,
          //   fontWeight: "bold",
          // },

          //Formato de icono
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        },
      },
    },

    MuiTextField:{
      styleOverrides: {
        root: {
          backgroundColor:coloresDesignados.Fondo,
        }
      }
    },

   // Item de las lista
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          backgroundColor: coloresDesignados.Fondo,
          color: coloresDesignados.Letra,
          fontSize: "18px",
          //Efecto cuando selecciona
          "& .MuiTouchRipple-root": {
            color: "blue",
          },
          //Hover cuando pasas en las opciones
          "&:hover": {
            backgroundColor: "orange",
            color: "orange",
          },
          //Valor seleccionado
          "&:focus": {
            backgroundColor: "skyblue",
            color: "skyblue",
          },
        },
      },
    },
  },
});
