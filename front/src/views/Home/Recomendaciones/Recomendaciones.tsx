import { useEffect, useContext, useState } from "react";
import { Vehiculo } from '../../../service/Vehiculo/apiVehiculo';
import Grid from "@mui/material/Grid2";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { useNavigate } from "react-router-dom";
import { apiFavorito } from "../../../service/Favorito/apiFavorito";
import { CardReview } from "../../../components/CardReview";
import { linkFotosArchivos, userData } from "../../../utils/utils";
import { ModalCompartir } from "./components/ModalCompartir";


const Filas = ({
    vehiculos,
    handleClick,
    inicio,
    final,
    apiData,
    verificarVehiculo,
    cargarFavorito,
    user,
    compartirVehiculo,
}: {
    vehiculos: Vehiculo[];
    handleClick: (vehiculo: Vehiculo) => void;
    inicio: number;
    final: number;
    apiData: any;
    verificarVehiculo: (idVehiculo: any) => boolean;
    compartirVehiculo: (vehiculo: any) => void;
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
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {vehiculos ? (
                    vehiculos.slice(inicio, final).map((vehiculo) => (
                        <Grid
                            key={vehiculo?.id}
                            size={{xs:12, sm:6, md:2.4}} // Ocupa todo el ancho en pantallas pequeñas
                            
                        >
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
                                compartirVehiculo={compartirVehiculo}
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
    const { vehiculos, cargarVehiculos } =
        useContext(VehiculoContext);
    const { setOpenSnack, setMensajeSnack, setAlertSnack } =
        useContext(VehiculoContext);
    const { saveFavoritos, favoritoUser, deleteFavorito } = apiFavorito();
    const [apiData, setApiData] = useState<any>(null);
    const [favoritos, setFavoritos] = useState<any[]>([]);
    const [vehiculoCompartir, setVehiculoCompartir] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const handleClick = (vehiculo: Vehiculo) => {
        const url = `/Vehiculo/?vehiculoId=${vehiculo.id}`;
        navigate(url);
    };

    const cargarFavorito = async (user: any) => {
        const response = await favoritoUser(user);
        setFavoritos(response);
    }

    const guardarFavorito = async ({ vehiculo, user }: { vehiculo: Vehiculo, user: any }) => {
        const valores = { vehiculo: { id: vehiculo.id }, user: user }

        const existe = verificarVehiculo(vehiculo.id);
        if (existe) {
            const idFavorito = favoritos.find((favorito) => favorito.vehiculo.id === vehiculo.id).id;
            const response = await deleteFavorito(idFavorito);
            if (response === "Borrado exitoso") {
                setMensajeSnack("Eliminaste el vehiculo de favoritos");
                setAlertSnack("info");
                setOpenSnack(true);
                cargarFavorito(user);
            }
            return;
        }
        else {
            const response = await saveFavoritos(valores)
            if (response) {
                cargarFavorito(user);
                setMensajeSnack("Se agrego a mis favoritos");
                setAlertSnack("success");
                setOpenSnack(true);
            }
        }
    }

    const verificarVehiculo = (idVehiculo: any) => {
        return favoritos.some((favorito: any) => favorito.vehiculo.id === idVehiculo);
    }

    const compartirVehiculo = (vehiculo: any) => {
        setVehiculoCompartir(vehiculo);
        setOpenModal(true);
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
            <ModalCompartir openModal={openModal} setOpenModal={setOpenModal} vehiculo={vehiculoCompartir} />
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
                    compartirVehiculo={compartirVehiculo}
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
                    compartirVehiculo={compartirVehiculo}
                />
            </div>
        </>
    );
};