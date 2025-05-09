import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import {
  apiVehiculo,
  Vehiculo,
} from "../../../../service/Vehiculo/apiVehiculo";
import { InputSelect } from "../../../../components/InputSelect";
import { InputComun } from "../../../../components/InputComun";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { apiReserva } from "../../../../service/Reserva/apiReserva";
import dayjs, { Dayjs } from "dayjs";
import { Buttons } from "../../../../components/Buttons";
import { useLocation } from "react-router-dom";

interface FormValues {
  marca: string;
  modelo: string;
  pasajeros: string;
  dateInicio: Dayjs | null;
  dateFinal: Dayjs | null;
}

const validationSchema = Yup.object({
  dateInicio: Yup.date().nullable().required("La fecha es obligatoria"),
  dateFinal: Yup.date().nullable().required("La fecha es obligatoria"),
});

interface Props {
  setVehiculos: React.Dispatch<React.SetStateAction<Vehiculo[]>>;
  setFechaInicio: React.Dispatch<React.SetStateAction<string>>;
  setFechaFin: React.Dispatch<React.SetStateAction<string>>;
  fechaInicio: string;
  fechaFin: string;
}

export const InputsBuscador = (props: Props) => {
  const { setVehiculos, setFechaFin, setFechaInicio, fechaFin, fechaInicio } =
    props;
  const { getMarcas, getModelos } = apiVehiculo();
  const { disponibilidad } = apiReserva();
  const [marcas, setMarcas] = useState<{ id: string; tipo: string }[]>([]);
  const [modelos, setModelos] = useState<{ id: string; tipo: string }[]>([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const onSubmit = async (values: FormValues) => {
    const formattedValues = {
      ...values,
      fechaInicio: values.dateInicio ? values.dateInicio.format("YYYY-MM-DD").toString() : null,
      fechaFinal: values.dateFinal ? values.dateFinal.format("YYYY-MM-DD").toString() : null,
    };

    setFechaInicio(
      values.dateInicio ? values.dateInicio.format("YYYY-MM-DD").toString() : ""
    );
    setFechaFin(
      values.dateFinal ? values.dateFinal.format("YYYY-MM-DD").toString() : ""
    );

    const response = await disponibilidad(formattedValues);
    setVehiculos(response);
  };

  const cargarModelos = async (marca: string) => {
    try {
      const modelosArray = await getModelos(marca);
      if (!modelosArray) return;

      const modelosOrdenados = [...modelosArray].sort((a, b) =>
        a.localeCompare(b)
      );
      const modelosObjetos = modelosOrdenados.map((modelo) => ({
        id: modelo,
        tipo: modelo,
      }));
      setModelos(modelosObjetos);
    } catch (error) {
      console.error("Error cargando modelos:", error);
    }
  };

  const cargarDatos = async () => {
    const marcasArray = await getMarcas();
    const marcasOrdenadas = marcasArray.sort((a: string, b: string) =>
      a.localeCompare(b)
    );
    const marcasObjetos = marcasOrdenadas.map((marca: string) => ({
      id: marca,
      tipo: marca,
    }));
    setMarcas(marcasObjetos);
    const storedDateInicio = queryParams.get("fechaInicio");
    const storedDateFinal = queryParams.get("fechaFin");

    if (storedDateInicio) {
      setFechaInicio(storedDateInicio);
    }
    if (storedDateFinal) {
      setFechaFin(storedDateFinal);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (marcaSeleccionada) {
      cargarModelos(marcaSeleccionada);
    }
  }, [marcaSeleccionada]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          initialValues={{
            marca: "",
            modelo: "",
            pasajeros: "",
            dateInicio:
              fechaInicio && dayjs(fechaInicio).isValid()
                ? dayjs(fechaInicio)
                : null,
            dateFinal:
              fechaFin && dayjs(fechaFin).isValid() ? dayjs(fechaFin) : null,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            resetForm,
          }) => (
            <Form noValidate>
              <div>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 2 }}>
                    <InputSelect
                      datos={marcas}
                      datosMostrar={"tipo"}
                      handleChange={(e) => {
                        handleChange(e);
                        setMarcaSeleccionada(e.target.value);
                      }}
                      label="Marca"
                      Name="marca"
                      value={values.marca}
                      size={"small"}
                      errors={errors}
                      touched={touched}
                      sxForm={{ width: "100%" }}
                      sxSelect={{ textAlign: "left" }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 2 }}>
                    <InputSelect
                      datos={modelos}
                      datosMostrar={"tipo"}
                      handleChange={handleChange}
                      label="Modelo"
                      Name="modelo"
                      value={values.modelo}
                      size={"small"}
                      errors={errors}
                      touched={touched}
                      sxForm={{ width: "100%" }}
                      sxSelect={{ textAlign: "left" }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 2 }}>
                    <InputComun
                      type={"number"}
                      key={"pasajeros"}
                      label={"Pasajeros"}
                      name={"pasajeros"}
                      value={values.pasajeros}
                      onChange={handleChange}
                      error={
                        touched["pasajeros"] && Boolean(errors["pasajeros"])
                      }
                      helperText={touched["pasajeros"] && errors["pasajeros"]}
                      size={"small"}
                      style={{ width: "100%" }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }}>
                    <DatePicker
                      label="Desde"
                      value={values.dateInicio}
                      onChange={(newValue) =>
                        setFieldValue("dateInicio", newValue)
                      }
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error:
                            touched.dateInicio && Boolean(errors.dateInicio),
                          helperText: touched.dateInicio && errors.dateInicio,
                          size: "small",
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }}>
                    <DatePicker
                      label="Hasta"
                      value={values.dateFinal}
                      onChange={(newValue) =>
                        setFieldValue("dateFinal", newValue)
                      }
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: touched.dateFinal && Boolean(errors.dateFinal),
                          helperText: touched.dateFinal && errors.dateFinal,
                          size: "small",
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Buttons
                    text="Realizar búsqueda"
                    variant="contained"
                    tipo="submit"
                  />

                  <Buttons
                    text="Reset"
                    variant="contained"
                    tipo="button"
                    onClick={() => {
                      resetForm();
                      setVehiculos([]);
                    }}
                    styles={{ marginLeft: "10px", width: "150px" }}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
    </div>
  );
};
