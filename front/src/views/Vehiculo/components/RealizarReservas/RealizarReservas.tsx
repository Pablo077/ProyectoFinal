import { Typography } from "@mui/material"
import { DynamicForm } from "../../../../components/Formik/DynamicForm"
import { DataInputs } from "./components/DataInputs";
import dayjs from "dayjs";

interface Props {
    fechaInicio: dayjs.Dayjs | null;
    fechaFin: dayjs.Dayjs | null;
}

export const RealizarReservas = (props: Props) => {
    const { formData } = DataInputs();
    const { fechaInicio, fechaFin } = props;

    const onSubmit = async (values: any) => {
        console.log(values);
    }

    return (
        <div>
            <Typography variant="h4" component="h1" textAlign={"center"}>
                Formulario de reserva
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignContent: "center", justifyContent: "center" }}>
                <Typography variant="h6" component="h4" >
                    Inicio: {fechaInicio ? dayjs(fechaInicio).format("DD-MM-YYYY").toString() : ""}
                </Typography>
                <Typography variant="h6" component="h4" >
                    Fin: {fechaFin ? dayjs(fechaFin).format("DD-MM-YYYY").toString() : ""}
                </Typography>

            </div>
            <div>
                <DynamicForm
                    column={1}
                    formJson={formData()}
                    onSubmit={onSubmit}
                    textoBoton="Actualizar"
                />
            </div>
        </div>
    )
}
