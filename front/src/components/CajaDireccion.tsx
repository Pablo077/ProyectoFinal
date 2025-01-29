import Icon from "@mdi/react";

interface Props {
    texto: string;
    path: string;
    size: number;
}

export const CajaDireccion = (props:Props) => {
    const { texto, path, size } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
      <Icon path={path} size={size} />
      <p style={{ margin: "1px", textAlign: "center", fontSize: "10px" }}>
        {texto}
      </p>
    </div>
  );
};
