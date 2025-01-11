import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

interface PropsSelect {
  datos: any | undefined;
  datosMostrar: string;
  errors: any;
  handleChange: (event: SelectChangeEvent) => void;
  label: string;
  Name: string;
  size: "small" | "medium";
  sxForm?: SxProps<Theme>;
  sxSelect?: SxProps<Theme>;
  touched: any;
  value: string | undefined;
}

export const InputSelect = (props: PropsSelect) => {
  const {
    datos,
    datosMostrar,
    errors,
    handleChange,
    label,
    Name,
    size,
    sxForm,
    sxSelect,
    touched,
    value,
  } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size={size} sx={sxForm}>
        <InputLabel id={Name}>{label}</InputLabel>
        <Select
          id={Name}
          label={Name}
          labelId={Name}
          name={Name}
          onChange={handleChange}
          sx={sxSelect}
          value={value}
        >
          {datos
            ? datos.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option[datosMostrar]}
                </MenuItem>
              ))
            : ""}
        </Select>
        <FormHelperText error={touched[Name] && Boolean(errors[Name])}>
          {touched[Name] && errors[Name]}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
