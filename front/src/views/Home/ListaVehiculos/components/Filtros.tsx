import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ICategoria } from "../../../../service/Categoria/apiCategoria";

interface Props {
  categorias: ICategoria[]; // Lista de categorías disponibles para filtrar
  rows: any[]; // Lista de elementos a filtrar (debe tener `categoria.nombre`)
  setRowsFilter: React.Dispatch<React.SetStateAction<any[]>>; // Estado de los elementos filtrados
}

export const Filtros = ({ categorias, rows, setRowsFilter }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  // Abrir y cerrar menú
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Manejar selección de categorías
  const toggleSeleccion = (nombre: string) => {
    setSeleccionadas((prev) =>
      prev.includes(nombre)
        ? prev.filter((item) => item !== nombre)
        : [...prev, nombre]
    );
  };

  // Filtrar y actualizar `setRowsFilter`
  useEffect(() => {
    if (seleccionadas.length === 0) {
      setRowsFilter(rows);
    } else {
      const filtrados = rows.filter((el) => {
        return seleccionadas.includes(el.categorias);
      });
      console.log(filtrados);
      setRowsFilter(filtrados);
    }
  }, [seleccionadas, rows, setRowsFilter]);

  return (
    <Box sx={{ textAlign: "left", marginTop: "10px", marginBottom: "20px" }}>
      <Typography variant="body1" component="h3" marginBottom="5px">
        Filtrar por categoría
      </Typography>
      <FormControl fullWidth>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{ textAlign: "left", width: "23%", fontSize: "10px" }}
        >
          {seleccionadas.length > 0
            ? seleccionadas.join(", ")
            : "Seleccionar..."}
        </Button>
      </FormControl>

      {/* Menú desplegable */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {categorias.map(({ nombre }) => (
          <MenuItem key={nombre} onClick={() => toggleSeleccion(nombre)}>
            <Checkbox checked={seleccionadas.includes(nombre)} />
            {nombre}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
