import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";
import { ColumnTablas, Tablas } from "../../components/Tablas";
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";

const columns: ColumnTablas[] = [
    { id: 'marca', label: 'Marca' },
    { id: 'modelo', label: 'Modelo' },
    { id: 'motor', label: 'Motor', align:"center" },
    { id: 'pasajeros', label: 'Pasajeros', align:"center" },
    { id: 'valijasGrandes', label: 'Valijas Grandes', align:"center" },
    { id: 'valijasChicas', label: 'Valijas Chicas', align:"center" },
    { id: 'cajaTipo', label: 'Caja' },
    { id: 'direccionTipo', label: 'Direccion' },
];

export const ListaVehiculos = () => {
    const { vehiculos } = useContext(VehiculoContext);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const mappedRows = vehiculos && vehiculos.map(vehiculo => ({
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            motor: vehiculo.motor,
            pasajeros: vehiculo.pasajeros,
            valijasGrandes: vehiculo.valijasGrandes,
            valijasChicas: vehiculo.valijasChicas,
            cajaTipo: vehiculo.caja?.tipo,
            direccionTipo: vehiculo.direccion?.tipo,
        }));

        // Ordenar las filas por marca
    const sortedRows = mappedRows.sort((a, b) => a.marca.localeCompare(b.marca));
    setRows(sortedRows);
       
    }, [vehiculos]);

    return (
        <div>
            <Tablas columns={columns} rows={rows} />
        </div>
    );
};
