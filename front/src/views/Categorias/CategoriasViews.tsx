import { ColumnTablas } from "../../components/Tablas";
import { Box, IconButton, Typography } from "@mui/material";
import { Tablas } from "../../components/Tablas";
import { apiCategoria, ICategoria } from "../../service/Categoria/apiCategoria";
import { useEffect, useState } from "react";
import { Buttons } from "../../components/Buttons";
import { ModalCategoria } from "./components/ModalCategoria";
import { useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { colores } from "../../styles/colors";
import { ModalEliminarCategoria } from "./components/ModalEliminarCategoria";


const columnsAgregar: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "descripcion", label: "Descripcion" },
  { id: "mainImage", label: "Imagen" },
];

const columnsEliminar: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "descripcion", label: "Descripcion" },
  { id: "mainImage", label: "Imagen" },
  { id: "eliminar", label: "Eliminar" },
];

export const CategoriasViews = () => {
  const { getCategoria } = apiCategoria();
  const [rows, setRows] = useState<any[]>([]);
  const [categoria, setCategoria] = useState<ICategoria>();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const location = useLocation();
  const ultimaPalabra = location.pathname.split("/").pop();

  const openModalEliminarCategoria = (categoria: any) => {
    setOpenModalEliminar(true);
    setCategoria(categoria);
  };

  const cargarDatos = async () => {
    const categorias = await getCategoria();
    const mappedRows = categorias.map((categoria: any) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      mainImage: categoria.mainImage,
      eliminar: (
        <IconButton
          aria-label="share"
          sx={{ padding: "1px 1px 5px 1px" }}
          onClick={() => openModalEliminarCategoria(categoria)}
        >
          <Icon path={mdiDelete} size={1} color={colores.Jasper} />
        </IconButton>
      ),
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
      <ModalCategoria
        openModal={openModal}
        setOpenModal={setOpenModal}
        cargarDatos={cargarDatos}
      />
      <ModalEliminarCategoria
        openModal={openModalEliminar}
        setOpenModal={setOpenModalEliminar}
        categoria={categoria}
        cargarDatos={cargarDatos}
      />
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
          {ultimaPalabra === "AgregarCategorias" && (
            <Buttons
              text="Agregar Categoría"
              variant="contained"
              onClick={openModalCategoria}
            />
          )}
        </div>
      </Box>
      <div style={{ marginTop: "50px", width: "70%", margin: "auto" }}>
        <Tablas
          columns={
            ultimaPalabra === "AgregarCategorias"
              ? columnsAgregar
              : columnsEliminar
          }
          rows={rows}
        />
      </div>
    </div>
  );
};
