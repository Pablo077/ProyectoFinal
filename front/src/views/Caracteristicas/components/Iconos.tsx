import Icon from "@mdi/react";
import { 
    mdiCarBrakeAbs,
    mdiCarBrakeAlert,
    mdiCarLightAlert,
    mdiCarSeat,
    mdiCarSports,
    mdiCarElectric,
    mdiCarBattery,
    mdiCarSeatHeater,
    mdiCarWireless,
    mdiCarTractionControl,
    mdiCarSeatCooler,
    mdiCarKey,
    mdiCarLightDimmed,
    mdiCarBrakeFluidLevel,

 } from "@mdi/js";
import { coloresDesignados } from "../../../styles/colors";

interface Props {
  iconNumber: number;
  size?: number;
}

export const Iconos = (props: Props) => {
  const { iconNumber, size = 0.7 } = props;
  let icon;

  // Asignar el icono basado en el nombre
  switch (iconNumber) {
    //ABS
    case 1:
      icon = mdiCarBrakeAbs;
      break;
    //Alerta de freno de coche
    case 2:
      icon = mdiCarBrakeAlert;
      break;
    //Alerta de luz del coche
    case 3:
      icon = mdiCarLightAlert;
      break;
    //Asiento de coche
    case 4:
      icon = mdiCarSeat;
      break;
    //Auto deportivo
    case 5:
      icon = mdiCarSports;
      break;
    //Auto electrico
    case 6:
      icon = mdiCarElectric;
      break;
    //Batería
    case 7:
      icon = mdiCarBattery;
      break;
    //Calentador de asiento de coche
    case 8:
      icon = mdiCarSeatHeater;
      break;
    //Conexión wifi
    case 9:
      icon = mdiCarWireless;
      break;
    //Control de tracción
    case 10:
      icon = mdiCarTractionControl;
      break;
    //Enfriador de asiento de coche
    case 11:
      icon = mdiCarSeatCooler;
      break;
    //Llaves de auto
    case 12:
      icon = mdiCarKey;
      break;
    //Luz del coche atenuada
    case 13:
      icon = mdiCarLightDimmed;
      break;
    //Nivel de líquido de frenos del coche
    case 14:
      icon = mdiCarBrakeFluidLevel;
      break;

    // Puedes agregar más casos para otros iconos
    default:
      icon = mdiCarSeat;
  }

  return <Icon path={icon} size={size} color={coloresDesignados.Hover} />;
};

export const IconosSelect = {
  datos: [
    { iconNumber: 1, nombre: "ABS" },
    { iconNumber: 2, nombre: "Alerta de freno de coche" },
    { iconNumber: 3, nombre: "Alerta de luz del coche" },
    { iconNumber: 4, nombre: "Asiento de coche" },
    { iconNumber: 5, nombre: "Auto deportivo" },
    { iconNumber: 6, nombre: "Auto electrico" },
    { iconNumber: 7, nombre: "Batería" },
    { iconNumber: 8, nombre: "Calentador de asiento de coche" },
    { iconNumber: 9, nombre: "Conexión wifi" },
    { iconNumber: 10, nombre: "Control de tracción" },
    { iconNumber: 11, nombre: "Enfriador de asiento de coche" },
    { iconNumber: 12, nombre: "Llaves de auto" },
    { iconNumber: 13, nombre: "Luz del coche atenuada" },
    { iconNumber: 14, nombre: "Nivel de líquido de frenos del coche" },
  ]
};

