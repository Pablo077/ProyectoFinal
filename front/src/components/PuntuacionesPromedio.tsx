import { useEffect, useState } from "react";
import { apiPuntuacion } from "../service/Puntuacion/apiPuntuacion"
import { HalfRatings } from "./HalfRatings";

export const PuntuacionesPromedio = () => {
    const { getPuntuacionesPromedio } = apiPuntuacion();
    const [puntuacion, setPuntuacion] = useState<any[]>([]);

    const cargarDatos = async () => {
        const result = await getPuntuacionesPromedio();
        setPuntuacion(result);
    }


    useEffect(() => {
        cargarDatos();
    }, [])

    return (
        <div>
            {/* <HalfRatings 
            cantidad={puntuacion.cantidad} 
            promedio={puntuacion.promedio}} 
            value={puntuacion.valor}
            /> */}
        </div>
    )
}
