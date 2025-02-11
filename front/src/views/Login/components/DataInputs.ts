import { FormJson } from "../../../components/Formik/interface";


export interface campos {
  email: string;
  password: string;
}

const valores : campos = {
  email: 'email',
  password: 'password'
  
}

export const formJson: FormJson[] = [
  {
    label: "Email",
    name: valores.email,
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
    name: valores.password,
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




