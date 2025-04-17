import { FormJson } from "../../../../components/Formik/interface";


export const formJson: FormJson[] = [
  {
    label: "Reseña",
    name: "resena",
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




