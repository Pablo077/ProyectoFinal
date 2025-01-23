import { FormikErrors, FormikTouched } from "formik";
import { InputComun } from "../../../components/InputComun";
import { ChangeEventHandler, useEffect } from "react";

interface Props {
  errors: FormikErrors<any>;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: any;
  touched: FormikTouched<any>;
}

export const Inputs = (props: Props) => {
  const { errors, onChange, value, touched } = props;


  return (
    <>
      <InputComun
        type={"input"}
        key={"nombre"}
        label={"Nombre"}
        name={"nombre"}
        value={value.nombre}
        onChange={(e) => {
          //console.log("Cambiando valor:", e.target.name, e.target.value);
          onChange(e);
        }}
        error={touched.nombre && Boolean(errors?.nombre)}
        helperText={touched.nombre && errors?.nombre}
        size={"small"}
        style={{ width: "100%" }}
      />
    </>
  );
};
