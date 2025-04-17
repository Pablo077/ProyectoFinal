import axios from "axios";
const linkFotos = "http://localhost:8080/vehiculo/fotos/";

// Función para obtener el valor de una cookie por su nombre
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

// Función para eliminar una cookie por su nombre
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

// 🔍 Ver datos de formData
export const verDatosFormData = (formData: FormData) => {
  console.log("Datos en FormData:");
  formData.forEach((value, key) => console.log(key, value));
}

export const linkFotosArchivos = (marca: string, modelo: string, archivo: string) => {
  let marca2 = marca.replace(/ /g, "_");
  let modelo2 = modelo.replace(/ /g, "_");
  let dato = `${marca2}_${modelo2}/${archivo}`;
  return `${linkFotos}${dato}`;
}

export const buscarPorId = <T extends { id: number }>(array: T[], id: number): T | undefined => {
  return array.find(item => item.id === id);
};


export const erroresAxios = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        error: true,
        mensaje: "Error en la solicitud",
        estado: error.response.status,
        data: error.response.data
      };
    } else {
      return {
        error: true,
        mensaje: "Error de Axios sin respuesta",
        estado: null,
        data: error.message
      };
    }
  }

  return {
    error: true,
    mensaje: "Error inesperado",
    estado: null,
    data: error instanceof Error ? error.message : JSON.stringify(error)
  };
};


export const userData = () =>{
  const cookieData = getCookie("user");
  if (cookieData) {
    const parsedUser = JSON.parse(cookieData);
    const userData = {
      id: parsedUser.id,
      firstname: parsedUser.firstname,
      lastname: parsedUser.lastname,
      role: parsedUser.rol,
    };
    return userData;
  }
}

export const obtenerFechaActual = () =>{
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Meses en JS son 0-indexados
  const dia = ahora.getDate().toString().padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}

export const formatearFecha = (fechaString: string): string | null =>{
  try {
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) {
      return null; // La cadena de fecha no es válida
    }
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${dia}/${mes}/${anio}`;
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return null; // O podrías lanzar el error si prefieres
  }
}