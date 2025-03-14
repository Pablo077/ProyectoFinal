import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { ColumnTablas, Tablas } from '../../components/Tablas';
import { VehiculoContext } from '../../context/VehiculoContext';
import { AccionesListaProductos } from "./components/AccionesListaProductos";

const columns: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "marca", label: "Marca" },
  { id: "modelo", label: "Modelo" },
  { id: "acciones", label: "Acciones", align: "center" },
];


export const CaracteristicasViews = () => {
  const { vehiculos } = useContext(VehiculoContext);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    const mappedRows = vehiculos.map((vehiculo) => ({
      id: vehiculo.id,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      acciones: <AccionesListaProductos vehiculo={vehiculo}/>
    }));

    
    const sortedRows = mappedRows.sort((a, b) => a.id - b.id);
    setRows(sortedRows);
  }, [vehiculos]);
  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
        <Typography variant="h4" component="h1">
          Lista de productos
        </Typography>
      </Box>
      <div>
        <Tablas columns={columns} rows={rows} />
      </div>
    </>
  )
}
