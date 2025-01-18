import axios from "axios";

const api_url = "localhost";
const port1 = "8080";

interface Props {
  url: string;
  valores: any;
  form?: any;
}

interface PropsGet {
  url: string;
}

export const postApiLocal = async (props: Props) => {
  const { url, valores = {} } = props;

  const result = await axios.post(
    `http://${api_url}:${port1}/${url}`,
    valores,
    // {
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //     authorization: localStorage.getItem("isAuthenticated"),
    //     Accept: "application/json",
    //   },
    //   withXSRFToken: true,
    //   withCredentials: true,
    // }
  );
  return result.data;
};

export const postApiLocalLoadFile = async (props: Props) => {
  const { url, form } = props;

  const result = await axios.post(`http://${api_url}:${port1}/${url}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result;
};

export const getApiLocal = async (props: PropsGet) => {
  const { url } = props;

  const result = await axios.get(`http://${api_url}:${port1}/${url}`, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-headers":
        "X-Requested-With, Content-Type, X-Token-Auth, Authorization",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  return result.data;
};

export const putApiLocal = async (props: Props) => {
  const { url, valores = {} } = props;

  const result = await axios.put(`http://${api_url}:${port1}/${url}`, valores, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: localStorage.getItem("isAuthenticated"),
      Accept: "application/json",
    },
    withXSRFToken: true,
    withCredentials: true,
  });
  return result;
};
