import { Divider, Typography } from "@mui/material"
import { colores } from "../../../styles/colors"
import { Buttons } from "../../../components/Buttons"
import { useNavigate } from "react-router-dom";

export const ReservaLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Login");
    }

    return (
        <div>
            <Divider sx={{ borderColor: colores.AntiFlashWhite, margin: "10px" }} />
            <Typography component="h5" variant="h5" marginLeft={"10px"} align="left" color={colores.AntiFlashWhite}>
                Realizar reserva
            </Typography>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Buttons text="RESERVAR" variant="contained" onClick={handleClick}/>
            </div>
        </div>
    )
}
