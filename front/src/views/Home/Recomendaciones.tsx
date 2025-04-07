import { useEffect, useContext, useState } from "react";
import { Vehiculo } from '../../service/Vehiculo/apiVehiculo';
import Grid from "@mui/material/Grid2";
import { VehiculoContext } from "../../context/VehiculoContext";
import { useNavigate } from "react-router-dom";
import { getCookie, linkFotosArchivos } from "../../utils/utils";
import { CardReview } from "../../components/CardReview";
import { apiFavorito } from "../../service/Favorito/apiFavorito";

const Filas = ({
  vehiculos,
  handleClick,
  inicio,
  final,
  apiData,
  verificarVehiculo,
  cargarFavorito,
  user,
}: {
  vehiculos: Vehiculo[];
  handleClick: (vehiculo: Vehiculo) => void;
  inicio: number;
  final: number;
  apiData: any;
  verificarVehiculo: (idVehiculo: any) => boolean
  cargarFavorito: ({
    vehiculo,
    user,
  }: {
    vehiculo: Vehiculo;
    user: any;
  }) => Promise<void>;
  user: any;
}) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {vehiculos ? (
          vehiculos.slice(inicio, final).map((vehiculo) => (
            <Grid size={2.3} key={vehiculo?.id}>
              <CardReview
                vehiculo={vehiculo}
                image={linkFotosArchivos(
                  vehiculo.marca,
                  vehiculo.modelo,
                  vehiculo.mainImage
                )}
                handleClick={handleClick}
                actions={apiData ? true : false}
                cargarFavorito={cargarFavorito}
                user={user}
                verificarVehiculo={verificarVehiculo}
              />
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export const Recomendaciones = () => {
  const { setVehiculo, vehiculos, cargarVehiculos } =
    useContext(VehiculoContext);
  const { saveFavoritos, favoritoUser } = apiFavorito();
  const [apiData, setApiData] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);	

  const navigate = useNavigate();

  const handleClick = (vehiculo: Vehiculo) => {
    setVehiculo(vehiculo);
    navigate("/Vehiculo");
  };

  const cargarFavorito = async (user:any) => {
    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.rol,
    };
    
    const response = await favoritoUser(userData);
    setFavoritos(response);
  }

  const guardarFavorito = async ({ vehiculo, user }: { vehiculo: Vehiculo, user: any }) => {
    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.rol,
    };
    const valores = { vehiculo: { id: vehiculo.id }, user: userData }
    const response = await saveFavoritos(valores)
    if (response) {
      cargarFavorito(userData);
    }
  }

  const verificarVehiculo = (idVehiculo:any) => {
    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i].vehiculo.id === idVehiculo) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    cargarVehiculos();
    const cookieData = getCookie("user");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cargarFavorito(parsedData)
      setApiData(parsedData);
    }
  }, []);


  return (
    <>
      <div>
        <Filas
          vehiculos={vehiculos}
          handleClick={handleClick}
          inicio={0}
          final={5}
          apiData={apiData}
          cargarFavorito={guardarFavorito}
          user={apiData}
          verificarVehiculo={verificarVehiculo}
           />
        <Filas
          vehiculos={vehiculos}
          handleClick={handleClick}
          inicio={5}
          final={10}
          apiData={apiData}
          cargarFavorito={guardarFavorito}
          user={apiData}
          verificarVehiculo={verificarVehiculo}
        />
      </div>
    </>
  );
};
