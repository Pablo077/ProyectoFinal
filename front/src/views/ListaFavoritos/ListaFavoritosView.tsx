import { useEffect, useState } from "react";
import { apiFavorito, IFavorito } from "../../service/Favorito/apiFavorito"
import { userData } from "../../utils/utils";
import { Box, Typography } from "@mui/material";
import { ColumnTablas, Tablas } from "../../components/Tablas";
import { AccionesListaFavoritos } from "./components/AccionesListaFavoritos";

const columns: ColumnTablas[] = [
  { id: "marca", label: "Marca" },
  { id: "modelo", label: "Modelo" },
  { id: "motor", label: "Motor" },
  { id: "caja", label: "Caja" },
  { id: "direccion", label: "Direccion" },
  { id: "acciones", label: "Acciones", align: "center" },
];

export const ListaFavoritosView = () => {
    const { favoritoUser } = apiFavorito();
    const [rows, setRows] = useState<any[]>([]);
    const [favoritos, setFavoritos] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    const cargarFavorito = async (user: any) => {
        const response = await favoritoUser(user);
        setFavoritos(response);
    }

    useEffect(() => {
        const mappedRows = favoritos.map((favorito) => ({
          marca: favorito.vehiculo.marca,
          modelo: favorito.vehiculo.modelo,
          motor: favorito.vehiculo.motor,
          caja: favorito.vehiculo.caja.tipo,
          direccion: favorito.vehiculo.direccion.tipo,
          acciones: <AccionesListaFavoritos favorito={favorito} user={user} cargarFavorito={cargarFavorito}/>
        }));
    
        
        const sortedRows = mappedRows.sort((a, b) => a.marca - b.marca);
        setRows(sortedRows);
      }, [favoritos]);

    useEffect(() => {
        const userResponse = userData();
        if (userResponse) {
            cargarFavorito(userResponse);
            setUser(userResponse);
        }
    }, [])

    return (
        <>
        <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
          <Typography variant="h4" component="h1">
            Lista de favoritos
          </Typography>
        </Box>
        <div>
          <Tablas columns={columns} rows={rows} />
        </div>
      </>
    )
}
