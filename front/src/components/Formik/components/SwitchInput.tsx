import { FormJson } from "../interface";
import { InputComun } from "../../InputComun";
import { InputSelect } from "../../InputSelect";
import { InputCheck } from "../../InputCheck";


interface Props {
  formJson: FormJson[];
  values: any;
  touched: any;
  errors: any;
  handleChange: any;
}

export const SwitchInput = (props: Props) => {
  const { formJson, errors, handleChange, touched, values } = props;

  return (
    <>
      {formJson.map(
        ({
          label,
          name,
          type,
          size,
          selectValues,
          sxForm,
          sxSelect,
          ocultar,
        }) => {
          switch (type) {
            case "input":
            case "email":
            case "password":
            case "date":
            case "number":
            case "textarea":  
              return (
                <div
                  key={name}
                  style={{ marginTop: "10px", display: ocultar ? "none" : "" }}
                >
                  <InputComun
                    type={type}
                    key={name}
                    label={label}
                    name={name ? name : ""}
                    value={values[name]}
                    onChange={handleChange}
                    error={touched[name] && Boolean(errors[name])}
                    helperText={touched[name] && errors[name]}
                    size={size}
                    style={sxForm}
                    // keyUp={(e) => Controlar(e.target.value =! undefined ? e.target.value : "" )}
                  />
                </div>
              );
            case "select":
              return (
                <div
                  key={name}
                  style={{ marginTop: "10px", display: ocultar ? "none" : "" }}
                >
                  <InputSelect
                    datos={selectValues?.datos}
                    datosMostrar={selectValues?.datosMostrar!}
                    handleChange={handleChange}
                    label={label}
                    Name={name}
                    value={values[name]}
                    size={size}
                    errors={errors}
                    touched={touched}
                    sxForm={sxForm}
                    sxSelect={sxSelect}
                  />
                </div>
              );

            case "checkbox":
              return (
                <div
                  key={name}
                  style={{
                    marginTop: "10px",
                    display: ocultar ? "none" : "",
                    textAlign: "center",
                  }}
                >
                  <InputCheck
                    label={label}
                    values={values}
                    name={name}
                  />
                </div>
              );

            default:
              throw new Error(`El type: ${type}, no es soportado`);
              break;
          }
        }
      )}
    </>
  );
};
