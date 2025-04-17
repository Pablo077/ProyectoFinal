import { FormJson } from "../../../components/Formik/interface";


export interface campos {
  email: string;
  password: string;
}

export const formJson: FormJson[] = [
  {
    label: "Email",
    name: "email",
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
    label: "Password",
    name: "password",
    type: "password",
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




