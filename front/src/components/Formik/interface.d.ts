export interface Validation {
  type: string;
}

interface Select {
  value: string | undefined;
  datos: any | undefined;
  datosMostrar: string;
}

export interface FormJson {
  label: string;
  name: string;
  selectValues?: Select;
  size: "small" | "medium";
  sxForm?: SxProps<Theme>;
  type: "input" | "password" | "email" | "select" | "date" | "number" | "checkbox";
  validation: Validation[];
  value: any;
  sxSelect?: SxProps<Theme>;
  ocultar?: boolean;
}

export interface Props {
  column: number;
  formJson: FormJson[];
  onSubmit: (values: any) => Promise<void>;
  textoBoton: string;
  textoBotonSecondary?: string;
  ButtonSecondary?: boolean;
  functionSecondary?: () => void;
}
