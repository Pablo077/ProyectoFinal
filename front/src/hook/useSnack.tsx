import { SnackPropio } from "../components/SnackBar/SnackPropio";

interface Props {
  mensaje: string;
  tipoAlert: "success" | "error" | "info" | "warning";
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSnack = () => {
  const SnackStatus = (props: Props) => {
    const { open, setOpen, mensaje, tipoAlert } = props;
    return (
      <SnackPropio
        autoHideDurat={4000}
        horizontalSnack="center"
        mensaje={mensaje}
        open={open}
        setOpen={setOpen}
        tipoAlert={tipoAlert}
        verticalSnack="bottom"
        transicion="left"
      />
    );
  };

  return {
    SnackStatus,
  };
};
