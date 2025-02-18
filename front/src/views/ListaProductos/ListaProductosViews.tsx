import { Box, Typography } from "@mui/material";
import { ColumnTablas, Tablas } from "../../components/Tablas";
import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";
import { AccionesListaProductos } from "./components/AccionesListaProductos";

const columns: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "marca", label: "Marca" },
  { id: "modelo", label: "Modelo" },
  { id: "acciones", label: "Acciones", align: "center" },
];

export const ListaProductosViews = () => {
  const { vehiculos } = useContext(VehiculoContext);
  const [rows, setRows] = useState<any[]>([]);

useEffect(() => {
    const mappedRows = vehiculos.map((vehiculo) => ({
      id: vehiculo.id,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      acciones: <AccionesListaProductos vehiculo={vehiculo}/>
    }));
    setRows(mappedRows);
  }, [vehiculos]);

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"70px"}>
        <Typography variant="h4" component="h1">
          Lista de productos
        </Typography>
      </Box>
      <div>
        <Tablas columns={columns} rows={rows} />
      </div>
    </>
  );
};
