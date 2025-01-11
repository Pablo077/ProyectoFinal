import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  variant: "contained" | "outlined" | "text"; 
  text: string;
  styles: SxProps<Theme> | undefined;
  href?: string;
  tipo?: "button" | "submit" | "reset";
}

export const Buttons = (props: Props) => {
  const { text, styles, variant, href, tipo } = props;
  return (
    <>
      <Button variant={variant} sx={styles} href={href} type={tipo}>
        {text}
      </Button>
    </>
  );
};
