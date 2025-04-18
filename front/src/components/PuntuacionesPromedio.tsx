import { useEffect, useState } from "react";
import { apiPuntuacion, iPuntuacion } from "../service/Puntuacion/apiPuntuacion"
import { HalfRatings } from "./HalfRatings";


interface Props {
    vehiculoId: number;
}


export const PuntuacionesPromedio = (props:Props) => {
    const { vehiculoId } = props;
    const { getPuntuacionesPromedio } = apiPuntuacion();
    const [puntuaciones, setPuntuaciones] = useState<iPuntuacion[]>([]);
    const [puntuacion, setPuntuacion] = useState<iPuntuacion>({
        vehiculoId: 0,
        promedio: 0,
        cantidad: 0,
    });

    const cargarDatos = async () => {
        const result = await getPuntuacionesPromedio();
        setPuntuaciones(result);
    }

    const buscarPuntuacion = () => {
        const puntuacionEncontrada = puntuaciones.find((p) => p.vehiculoId === vehiculoId);
        
        if (puntuacionEncontrada) {
            setPuntuacion(puntuacionEncontrada);
        } else {
            setPuntuacion({
                vehiculoId: 0,
                promedio: 0,
                cantidad: 0,
            });
        }
    }
    
    useEffect(() => {
        buscarPuntuacion();
    }, [puntuaciones])


    useEffect(() => {
        cargarDatos();
    }, [])

    return (
        <div>
            <HalfRatings 
            cantidad={puntuacion.cantidad.toString()} 
            promedio={parseFloat(puntuacion.promedio.toFixed(1))} 
            />
        </div>
    )
}
