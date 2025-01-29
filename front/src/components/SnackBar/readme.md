const { SnackStatus } = useSnack();
const [openSnack, setOpenSnack] = useState(false);
const [alertSnack, setAlertSnack] = useState<"success" | "error" | "info" | "warning">("success");
const [mensajeSnack, setMensajeSnack] = useState("");

setMensajeSnack(response);
setAlertSnack(()=>response === "Vehículo guardado correctamente" ? "success" : "error");
setOpenSnack(true);

<SnackStatus
        mensaje={mensajeSnack}
        open={openSnack}
        setOpen={setOpenSnack}
        tipoAlert={alertSnack}
      />
