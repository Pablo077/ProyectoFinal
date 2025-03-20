import { FormJson } from "../../../components/Formik/interface";

export const formJson: FormJson[] = [
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
    sxForm: {
      width: "100%",
    },
  },
  {
    label: "Descripcion",
    name: "descripcion",
    type: "input",
    value: "",
    size: "small",
    validation: [
      {
        type: "required",
      },
    ],
    sxForm: {
      width: "100%",
    },
  },
];




