import axios from "axios";
import { getCookie } from "../../utils/utils";

const api_url = "http://localhost";
const port1 = "8080";

interface Props {
  url: string;
  valores: any;
  form?: any;
}

interface PropsGet {
  url: string;
}

const obtenerToken = (): string | null => {
  try {
    const cookieData = getCookie("user");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      return parsedData.token ? `Bearer ${parsedData.token}` : null;
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
  }
  return null;
};

const api = axios.create({
  baseURL: `${api_url}:${port1}`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// 🔹 Función para Enviar Peticiones POST
export const postApiLocal = async (props: Props) => {
  const { url, valores = {} } = props;

  const result = await api.post(`/${url}`, valores, {
    headers: {
      Accept: "application/json",
    },
  });
  return result.data;
};

// 🔹 Función para Enviar Peticiones POST
export const deleteApiLocal = async (url: string, id: number) => {
  const result = await api.delete(`/${url}/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return result.data;
};

// 🔹 Subir Archivos con FormData
export const postApiLocalLoadFile = async (props: Props) => {
  const { url, form } = props;

  const result = await api.post(`/${url}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result;
};

// 🔹 Función para Peticiones GET
export const getApiLocal = async (props: PropsGet) => {
  const { url } = props;
  const result = await api.get(`/${url}`, {
    headers: { Accept: "application/json" },
  });
  return result.data;
};

// 🔹 Función para Peticiones PUT
export const putApiLocal = async (props: Props) => {
  const { url, valores = {} } = props;

  const result = await api.put(`/${url}`, valores, {
    headers: { Accept: "application/json" },
  });
  return result;
};
