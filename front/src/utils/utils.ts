import { mdiConsoleLine } from "@mdi/js";

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

export const linkFotosArchivos = (marca: string, modelo: string, archivo: string)=>{
  let marca2 = marca.replace(/ /g, "_");
    let modelo2 = modelo.replace(/ /g, "_");
    let dato = `${marca2}_${modelo2}/${archivo}`;
    return `${linkFotos}${dato}`;
}