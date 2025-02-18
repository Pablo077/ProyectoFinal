import { useEffect, useState } from "react";
import { apiUsers, userList } from "../../service/Users/apiUsers";
import { ColumnTablas, Tablas } from "../../components/Tablas";
import { AccionesListaUsuarios } from "./AccionesListaUsuarios";

const columns: ColumnTablas[] = [
  { id: "id", label: "Id" },
  { id: "firstname", label: "Nombre" },
  { id: "lastname", label: "Apellido" },
  { id: "email", label: "Correo" },
  { id: "rol", label: "Rol" },
  { id: "acciones", label: "Acciones", align: "center" },
];



export const ListaUsuariosView = () => {
  const { getUsers } = apiUsers();
  const [rows, setRows] = useState<any[]>([]);

  

  const cargarDatos = async () => {
    const response = await getUsers();
    const mappedRows = response.map((user: userList) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      rol: user.rol,
      acciones: <AccionesListaUsuarios user={user} cargarDatos={cargarDatos}/>
    }));
    setRows(mappedRows);
  }


  useEffect(() => {
    cargarDatos();
  }, [])



  return (
    <div>
      <div style={{textAlign:"center"}}>
        <h1>Lista de usuarios</h1>
      </div>
      <div>
        <Tablas columns={columns} rows={rows}/>
      </div>
    </div>
  )
}
