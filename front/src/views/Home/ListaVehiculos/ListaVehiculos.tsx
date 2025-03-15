import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { ColumnTablas, Tablas } from "../../../components/Tablas";
import { apiCategoria, ICategoria } from "../../../service/Categoria/apiCategoria";
import { getCookie } from "../../../utils/utils";
import { Filtros } from "./components/Filtros";

const columns: ColumnTablas[] = [
  { id: "marca", label: "Marca" },
  { id: "modelo", label: "Modelo" },
  { id: "motor", label: "Motor", align: "center" },
  { id: "pasajeros", label: "Pasajeros", align: "center" },
  { id: "valijasGrandes", label: "Valijas Grandes", align: "center" },
  { id: "valijasChicas", label: "Valijas Chicas", align: "center" },
  { id: "cajaTipo", label: "Caja" },
  { id: "direccionTipo", label: "Direccion" },
  { id: "categorias", label: "Categoría" },

];

export const ListaVehiculos = () => {
  const { vehiculos } = useContext(VehiculoContext);
  const { getCategoria } = apiCategoria();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsFilter, setRowsFilter] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const CargarRows = () => {
    const mappedRows =
      vehiculos &&
      vehiculos.map((vehiculo) => ({
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        motor: vehiculo.motor,
        pasajeros: vehiculo.pasajeros,
        valijasGrandes: vehiculo.valijasGrandes,
        valijasChicas: vehiculo.valijasChicas,
        cajaTipo: vehiculo.caja?.tipo,
        direccionTipo: vehiculo.direccion?.tipo,
        categorias: vehiculo.categoria.nombre,
      }));

    // Ordenar las filas por marca
    const sortedRows = mappedRows.sort((a, b) =>
      a.marca.localeCompare(b.marca)
    );
    setRows(sortedRows);
  };

  const CargarCategorías = async () => {
    const cookieData = getCookie("user");
    if (cookieData) {
      const response = await getCategoria();
      setCategorias(response);
    }
  };

  useEffect(() => {
    CargarRows();
    CargarCategorías();
  }, [vehiculos]);

  return (
    <div>
      <Filtros categorias={categorias} rows={rows} setRowsFilter={setRowsFilter}/>
      <Tablas columns={columns} rows={rowsFilter} />
    </div>
  );
};
