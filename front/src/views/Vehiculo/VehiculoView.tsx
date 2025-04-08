import { useEffect, useState } from "react";
import { Caracteristicas } from "./components/Caracteristicas"
import { FotosDetalles } from "./components/FotosDetalles"
import { getCookie } from "../../utils/utils";
import { Reservas } from "./components/Reservas";
import { PoliticasUso } from "./components/PoliticasUso";


export const VehiculoView = () => {
  const [apiData, setApiData] = useState<any>(null);
  
    useEffect(() => {
      const cookieData = getCookie("user");
      if (cookieData) {
        const parsedData = JSON.parse(cookieData);
        setApiData(parsedData);
      }
    }, []);
    
  return (
    <div>
      <FotosDetalles />
      {apiData && <Reservas />}
      <Caracteristicas />
      <PoliticasUso />
    </div>
  )
}
