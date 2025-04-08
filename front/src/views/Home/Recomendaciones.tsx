import { useEffect, useContext, useState } from "react";
import { Vehiculo } from '../../service/Vehiculo/apiVehiculo';
import Grid from "@mui/material/Grid2";
import { VehiculoContext } from "../../context/VehiculoContext";
import { useNavigate } from "react-router-dom";
import { linkFotosArchivos, userData } from "../../utils/utils";
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
  const { saveFavoritos, favoritoUser, deleteFavorito } = apiFavorito();
  const [apiData, setApiData] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
  useContext(VehiculoContext);	

  const navigate = useNavigate();

  const handleClick = (vehiculo: Vehiculo) => {
    setVehiculo(vehiculo);
    navigate("/Vehiculo");
  };

  const cargarFavorito = async (user:any) => {
    const response = await favoritoUser(user);
    setFavoritos(response);
  }

  const guardarFavorito = async ({ vehiculo, user }: { vehiculo: Vehiculo, user: any }) => {
    const valores = { vehiculo: { id: vehiculo.id }, user: user }

    const existe = verificarVehiculo(vehiculo.id);
    if (existe) {
      const idFavorito = favoritos.find((favorito) => favorito.vehiculo.id === vehiculo.id).id;
      const response = await deleteFavorito(idFavorito);
      if(response === "Borrado exitoso"){
        setMensajeSnack("Eliminaste el vehiculo de favoritos");
        setAlertSnack("info");
        setOpenSnack(true);
        cargarFavorito(user);

      }
      return;
    }	
    else{
      const response = await saveFavoritos(valores)
      if (response) {
        cargarFavorito(user);
        setMensajeSnack("Se agrego a mis favoritos");
        setAlertSnack("success");
        setOpenSnack(true);
      }
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
    const userResponse = userData();
    if (userResponse) {
      setApiData(userResponse);
      cargarFavorito(userResponse);
      setUser(userResponse);
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
          user={user}
          verificarVehiculo={verificarVehiculo}
           />
        <Filas
          vehiculos={vehiculos}
          handleClick={handleClick}
          inicio={5}
          final={10}
          apiData={apiData}
          cargarFavorito={guardarFavorito}
          user={user}
          verificarVehiculo={verificarVehiculo}
        />
      </div>
    </>
  );
};
