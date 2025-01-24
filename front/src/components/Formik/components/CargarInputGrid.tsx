import React from "react";

import { SwitchInput } from "./SwitchInput";
import Grid from '@mui/material/Grid2';
import { FormJson } from "../interface";

interface Propscargar {
  errors: any;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  touched: any;
  values: any;
  column: number;
  formJson: FormJson[];
}

export const CargarInputGrid = () => {
    
  const cargarInputGrid = (props: Propscargar) => {
    const { errors, handleChange, touched, values, column, formJson } = props;

    let resultado: JSX.Element[] = [];
    const columnas = 12 / column;
    const cantidadInput = Math.trunc(formJson.length / column);
    let restoInput = Math.trunc(formJson.length % column);

    let anterior = 0;

    for (let index = 0; index < column; index++) {
      let suma = restoInput > 0 ? 1 : 0;
      let desde = index === 0 ? 0 : anterior;
      let hasta = desde + cantidadInput + suma;

      resultado.push(
        <Grid columns={{xs:columnas}} key={index}>
          <SwitchInput
            errors={errors}
            formJson={formJson.slice(desde, hasta)}
            handleChange={handleChange}
            touched={touched}
            values={values}
          />
        </Grid>
      );
      anterior = hasta;
      restoInput = restoInput - 1;
    }

    return resultado;
  };

  return { cargarInputGrid };
};
