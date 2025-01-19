import { FormJson } from "../../../components/Formik/interface";


export interface IingPr {
  email: string;
  password: string;
}

export const formJsonIP: FormJson[] = [
  {
    label: "Nombre",
    name: "nombre",
    type: "input",
    value: "",
    size: "small",
    validation: [
      {
        type: "required",
      },
    ],
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "input",
    value: "",
    size: "small",
    validation: [
      {
        type: "required",
      },
    ],
  },
  {
    label: "Pasajeros",
    name: "pasajeros",
    type: "number",
    value: "",
    size: "small",
    validation: [
      {
        type: "required",
      },
    ],
  },
];





