import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "./Alert";

interface PropsSnack {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tipoAlert: "error" | "warning" | "info" | "success";
    mensaje: string;
    horizontalSnack: "center" | "left" | "right";
    verticalSnack: "bottom" | "top";
    transicion: "left" | "right" | "up" | "down";
    autoHideDurat: number;
}

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const Transition = (transicion: string) => {
    switch (transicion) {
      case "left":
        return TransitionLeft;
      case "right":
        return TransitionRight;
      case "up":
        return TransitionUp;
      case "down":
        return TransitionDown;
      default:
        break;
    }
  };


export const SnackPropio = (props: PropsSnack) => {

  const { open, setOpen, tipoAlert, mensaje, autoHideDurat, horizontalSnack, transicion, verticalSnack } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: 300 }}>
        <Snackbar
          open={open}
          autoHideDuration={autoHideDurat}
          onClose={handleClose}
          TransitionComponent={Transition(transicion)}
          anchorOrigin={{
            vertical: verticalSnack,
            horizontal: horizontalSnack,
          }}
        >
          <Alert
            onClose={handleClose}
            severity={tipoAlert}
            sx={{ width: "100%" }}
          >
            {mensaje}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
