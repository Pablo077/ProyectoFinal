import { SxProps, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


interface Props {
  error: boolean | undefined ;
  helperText: any;
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  size: "small" | "medium";
  style?: SxProps<Theme>;
  type: string;
  value: number | string;
  keyUp?: (e: any) => void | undefined;
}

export const InputComun = (props: Props) => {
  const {
    error,
    helperText,
    label,
    name,
    onChange,
    size,
    style,
    type,
    value,
    keyUp,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return type === "password" ? (
    <TextField
      error={error}
      helperText={helperText}
      hiddenLabel
      id={name}
      key={name}
      label={label}
      name={name}
      onChange={onChange}
      size={size}
      sx={style}
      type={showPassword ? "text" : "password"}
      value={value}
      onKeyUp={keyUp}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      error={error}
      helperText={helperText}
      hiddenLabel
      id={name}
      key={name}
      label={label}
      name={name}
      onChange={onChange}
      size={size}
      sx={style}
      type={type}
      value={value}
      onKeyUp={keyUp}
      multiline={type === "textarea" ? true : false}
    />
  );
};
