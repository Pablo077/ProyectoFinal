import { FormikErrors, FormikTouched } from "formik";
import { InputComun } from "../../../components/InputComun";
import { ChangeEventHandler, useEffect, useState } from "react";
import { InputSelect } from "../../../components/InputSelect";
import { apiCaja } from "../../../service/Caja/apiCaja";
import { apiDireccion } from "../../../service/Direccion/apiDireccion";

interface Props {
  errors: FormikErrors<any>;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  value: any;
  touched: FormikTouched<any>;
}

export const Inputs = (props: Props) => {
  const { errors, handleChange, value, touched } = props;
  const {getCajas} = apiCaja();
  const {getDireccion} = apiDireccion();
  const [caja,setCaja] = useState([]);
  const [direccion,setDireccion] = useState([]);



  const cargarDatos = async ()=>{
    setCaja(await getCajas());
    setDireccion(await getDireccion());
  }

  useEffect(() => {
    cargarDatos();
  }, [])
  

  return (
    <>
      <div>
        <InputComun
          type={"input"}
          key={"nombre"}
          label={"Nombre"}
          name={"nombre"}
          value={value.nombre}
          onChange={(e) => { handleChange(e); }}
          error={touched.nombre && Boolean(errors?.nombre)}
          helperText={touched.nombre && errors?.nombre}
          size={"small"}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <InputComun
          type={"input"}
          key={"descripcion"}
          label={"Descripción"}
          name={"descripcion"}
          value={value.descripcion}
          onChange={(e) => { handleChange(e); }}
          error={touched.descripcion && Boolean(errors?.descripcion)}
          helperText={touched.descripcion && errors?.descripcion}
          size={"small"}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <InputComun
          type={"number"}
          key={"pasajeros"}
          label={"Pasajeros"}
          name={"pasajeros"}
          value={value.pasajeros}
          onChange={(e) => { handleChange(e); }}
          error={touched.pasajeros && Boolean(errors?.pasajeros)}
          helperText={touched.pasajeros && errors?.pasajeros}
          size={"small"}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <InputComun
          type={"number"}
          key={"valijasGrandes"}
          label={"Valijas Grandes"}
          name={"valijasGrandes"}
          value={value.valijasGrandes}
          onChange={(e) => { handleChange(e); }}
          error={touched.valijasGrandes && Boolean(errors?.valijasGrandes)}
          helperText={touched.valijasGrandes && errors?.valijasGrandes}
          size={"small"}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <InputComun
          type={"number"}
          key={"valijasChicas"}
          label={"Valijas Chicas"}
          name={"valijasChicas"}
          value={value.valijasChicas}
          onChange={(e) => { handleChange(e); }}
          error={touched.valijasChicas && Boolean(errors?.valijasChicas)}
          helperText={touched.valijasChicas && errors?.valijasChicas}
          size={"small"}
          style={{ width: "100%" }}
        />
      </div>
      
    </>
  );
};
