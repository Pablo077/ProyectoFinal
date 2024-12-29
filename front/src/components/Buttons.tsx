import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  variant: "contained" | "outlined" | "text"; 
  text: string;
  styles: SxProps<Theme> | undefined;
}

export const Buttons = (props: Props) => {
  const { text, styles, variant } = props;
  return (
    <>
      <Button variant={variant} sx={styles}>
        {text}
      </Button>
    </>
  );
};
