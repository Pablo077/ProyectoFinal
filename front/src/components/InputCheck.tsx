import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CSSProperties, useState } from "react";


interface Props {
  label: string;
  style?: CSSProperties;
  values: any;
  name: string;
}

export const InputCheck = (props: Props) => {
  const { label, style, values, name } = props;
  const [checked, setChecked] = useState(values[name]);

  const checkedtilt = () => {
    setChecked(!checked);
    values[name] = !checked
  };

  return (
    <FormGroup style={style}>
      <FormControlLabel control={<Checkbox checked={checked} />} label={label} onChange={checkedtilt}/>
    </FormGroup>
  );
};
