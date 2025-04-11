import { FormJson } from "../../../../components/Formik/interface";


export const formJson: FormJson[] = [
  {
    label: "Mensaje",
    name: "mensaje",
    type: "textarea",
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




