import { useNavigate } from "react-router-dom";
import { Buttons } from "../../components/Buttons"


export const MenuBotonesUser = () => {
    const navigate = useNavigate();

    const handleClickFavoritos = () => {
        navigate("/ListaFavoritos");
    }
    const handleClickHistorial = () => {
        navigate("/ReservaHistorial");
    }


    return (
        <>
            <Buttons
                text="Lista de favoritos"
                variant="contained"
                styles={{ marginRight: "10px" }}
                onClick={handleClickFavoritos}
            />
            <Buttons
                text="Historial de reservas"
                variant="contained"
                styles={{ marginRight: "10px" }}
                onClick={handleClickHistorial}
            />
        </>
    )
}
