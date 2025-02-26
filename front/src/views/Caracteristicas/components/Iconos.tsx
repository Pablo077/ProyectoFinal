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

interface Props {
  iconNumber: number;
}

export const Iconos = (props: Props) => {
  const { iconNumber } = props;
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

  return <Icon path={icon} size={1} color="black" />;
};
