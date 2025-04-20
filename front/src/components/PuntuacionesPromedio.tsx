import { useEffect, useState } from "react";
import { iPuntuacionPromedio } from "../service/Puntuacion/apiPuntuacion";
import { HalfRatings } from "./HalfRatings";

interface Props {
  vehiculoId: number;
  puntuacionesPromedio: iPuntuacionPromedio[];
  cargarPuntuacionesPromedio: () => Promise<void>;
}

export const PuntuacionesPromedio = (props: Props) => {
  const { vehiculoId, puntuacionesPromedio, cargarPuntuacionesPromedio } =
    props;
  const [puntuacion, setPuntuacion] = useState<iPuntuacionPromedio>({
    vehiculoId: 0,
    promedio: 0,
    cantidad: 0,
  });

  const buscarPuntuacion = () => {
    const puntuacionEncontrada = puntuacionesPromedio.find(
      (p) => p.vehiculoId === vehiculoId
    );

    if (puntuacionEncontrada) {
      setPuntuacion(puntuacionEncontrada);
    } else {
      setPuntuacion({
        vehiculoId: 0,
        promedio: 0,
        cantidad: 0,
      });
    }
  };

  useEffect(() => {
    buscarPuntuacion();
  }, [puntuacionesPromedio]);

  useEffect(() => {
    cargarPuntuacionesPromedio();
  }, []);

  return (
    <div>
      <HalfRatings
        cantidad={puntuacion.cantidad.toString()}
        promedio={parseFloat(puntuacion.promedio.toFixed(1))}
      />
    </div>
  );
};
