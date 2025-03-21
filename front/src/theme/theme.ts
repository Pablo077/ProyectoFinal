import { ThemeOptions, createTheme } from "@mui/material";
import { colores, coloresDesignados } from "../styles/colors";


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
              borderColor: coloresDesignados.Letra,
            },
            //Linea cuando se hace hover
            "&:hover fieldset": {
              borderColor: coloresDesignados.Hover,
            },
            //Linea cuando se hace foco en input
            "&.Mui-focused fieldset": {
              borderColor: coloresDesignados.Hover,
            },
            //Texto input cuando se sale de foco y se selecciona una lista.
            "& .MuiOutlinedInput-input": {
              boxShadow: `0 0 0 100px ${coloresDesignados.Fondo} inset`,
              textFillColor: coloresDesignados.Letra,
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
            color: coloresDesignados.Letra,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: coloresDesignados.Fondo,
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
          fontSize: "14px",
          margin:"0px",
          padding:"0px",
          //Efecto cuando selecciona
          "& .MuiTouchRipple-root": {
            color: coloresDesignados.Hover,
          },
          //Hover cuando pasas en las opciones
          "&:hover": {
            backgroundColor: coloresDesignados.Letra,
            color: coloresDesignados.Fondo,
          },
          //Valor seleccionado
          "&:focus": {
            backgroundColor: coloresDesignados.Fondo,
            color: coloresDesignados.Hover,
          },
        },
      },
    },
    //Boton
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: coloresDesignados.Fondo, // Cambia aquí al color deseado
          color: coloresDesignados.Letra, // Color del texto del botón
          borderColor: coloresDesignados.Letra, // Color del borde del botón 
          borderWidth: "1px", // Ancho del borde del botón 
          borderStyle: "solid", // Estilo del borde del botón
          "&:hover": {
            backgroundColor: coloresDesignados.Hover, // Cambia aquí al color deseado para el hover
            color: coloresDesignados.Letra,
          },
          "&.Mui-disabled": {
            backgroundColor: coloresDesignados.Fondo, // Color del botón cuando está deshabilitado
          },
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "0 7px", // Espacio entre filas
          backgroundColor: coloresDesignados.Fondo,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          //backgroundColor: coloresDesignados.Fondo, // Fondo del encabezado
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colores.SlateGray}`, // Borde entre filas
          color: coloresDesignados.Letra, // Color del texto de las celdas
          backgroundColor: coloresDesignados.Fondo,
          padding:"1px 1px",
        },
        head: {
          fontWeight: "bold", // Texto en negrita para el encabezado
          fontSize: "1rem", // Tamaño de fuente del encabezado
        },
        body: {
          fontSize: "0.9rem", // Tamaño de fuente del cuerpo
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // "&:nth-of-type(odd)": {
          //   backgroundColor: "#f9f9f9", // Fondo alterno para filas impares
          // },
          // "&:hover": {
          //   backgroundColor: "#e0e0e0", // Color de fondo al pasar el mouse
          // },
         
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: coloresDesignados.Fondo, // Fondo de la barra de paginación
          color: coloresDesignados.Letra, // Color del texto
        },
        select: {
          backgroundColor: coloresDesignados.Fondo, // Fondo del selector de filas
          color: coloresDesignados.Letra, // Color de texto del selector
        },
        selectIcon: {
          color: coloresDesignados.Letra, // Color del ícono del selector
        },
        actions: {
          color: coloresDesignados.Letra, // Color de las flechas de navegación
        },
        displayedRows: {
          color: coloresDesignados.Letra, // Color de los textos de 'of' y 'Rows per page'
        },
      },
    },

  },
});







