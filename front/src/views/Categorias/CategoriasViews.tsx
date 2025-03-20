import { ColumnTablas } from "../../components/Tablas";
import { Box, Typography } from "@mui/material";
import { Tablas } from "../../components/Tablas";
import { apiCategoria } from "../../service/Categoria/apiCategoria";
import { useEffect, useState } from "react";
import { Buttons } from "../../components/Buttons";
import { ModalCategoria } from "./components/ModalCategoria";

const columns: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "descripcion", label: "Descripcion" },
  { id: "mainImage", label: "Imagen" },
];

export const CategoriasViews = () => {
  const { getCategoria } = apiCategoria();
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const cargarDatos = async () => {
    const categorias = await getCategoria();
    const mappedRows = categorias.map((categoria: any) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      mainImage: categoria.mainImage,
    }));
    const sortedRows = mappedRows.sort((a: any, b: any) => a.id - b.id);
    setRows(sortedRows);
  };

  const openModalCategoria = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div>
      <ModalCategoria openModal={openModal} setOpenModal={setOpenModal} cargarDatos={cargarDatos}/>
      <Box flex={1} mt={10} textAlign="center" marginTop={"150px"}>
        <Typography variant="h4" component="h1">
          Lista de Categorías
        </Typography>
        <div
          style={{
            textAlign: "right",
            width: "85%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Buttons
            text="Agregar Categoría"
            variant="contained"
            onClick={openModalCategoria}
          />
        </div>
      </Box>
      <div style={{ marginTop: "50px", width: "70%", margin: "auto" }}>
        <Tablas columns={columns} rows={rows} />
      </div>
    </div>
  );
};
