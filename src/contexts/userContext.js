import { createContext, useEffect, useState } from "react";
import { conexionHttp } from "../Api/Conexion";

const UserContext = createContext();

function UserProvider({children}) {
  const [cargando, setCargando] = useState(false);
  const [objRes, setObjRes] = useState(null);
  const [sesion, setSesion] = useState(null);
  const [error, setError] = useState(null);
  const [supNums, setSupNums] = useState(null);
  const [res, setRes] = useState("");

  let api = conexionHttp();
  const url = "http://localhost:5000/";

  function getToken() {
    const token = localStorage.getItem("localfile");
    if (token) return true;
    return false;
  }
  useEffect(() => {
    const getinfo = async () => {
      try {
        if (getToken()) {
          setCargando(true);
          const res = await conexionHttp().get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("localfile")
            }
          });
          console.log(res);
          if (!res.error) {
            setError(null);
            setSesion(true);
            const {user} = res;
            setObjRes(user);
            const resSN = await conexionHttp().get("http://localhost:5000/app/SN", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("localfile")
              }
            });
            console.log(resSN);
            setSupNums(resSN);
          } else {
            setObjRes(null);
            setError(res);
            setSesion(false);
          }
          setCargando(false);
        } else {
          setSesion(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getinfo();
  }, [url]);

  const getSuperNums = async (token) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
      const res = await api.get("http://localhost:5000/app/SN", options);
      console.log(res);
      setSupNums(res);
    } catch (error) {
      console.log(error);
    }
  }

  const registro = async(data) => {
    try {
      setCargando(true);
      let options = {
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
      };
      const res = await api.post("http://localhost:5000/auth/register", options);
      if (!res.error) {
        const { token } = res;
        const res2 = await api.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        });
        const { user } = res2;
        setObjRes(user);
        setSesion(true);
        localStorage.setItem("localfile", token);
        getSuperNums(token);
        setCargando(false);
      } else {
        setError(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const login = async (data) => {
    try {
      setCargando(true);
      let options = {
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
      };
      const res = await api.post("http://localhost:5000/auth/login", options);
      if (!res.error) {
        const { token } = res;
        const res2 = await api.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        });
        const { user } = res2;
        setObjRes(user);
        setSesion(true);
        localStorage.setItem("localfile", token);
        getSuperNums(token);
        setCargando(false);
      } else {
        setError(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const nuevoNumero = async (data) => {
    try {
      setCargando(true);
      let options = {
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("localfile")
        },
      };
      const res = await api.post("http://localhost:5000/app/SN", options);
      const {numero} = res;
      const comparacion = supNums.filter(num => num.numInit===numero.numInit);
      if(comparacion.length<=0){
        setSupNums([
          ...supNums,
          numero
        ]);
        setRes("");
      }else {
        setRes(`${numero.superNum}`);
      }
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarNum = async (id) => {
    try {
      setCargando(true);
      let options = {
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("localfile")
        },
      };
      const res = await api.deleteB(`http://localhost:5000/app/SN/${id}`, options);
      console.log(res);
      const {numero} = res;
      const numeros = supNums.filter(num => num._id!==numero._id);
      setSupNums(numeros);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarNums = async () => {
    try {
      setCargando(true);
      let options = {
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("localfile")
        },
      };
      const res = await api.deleteB("http://localhost:5000/app/SN", options);
      console.log(res);
      setSupNums([]);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }
  const data = {
    sesion,
    objRes,
    error,
    supNums,
    cargando,
    setSesion,
    res,
    registro,
    login,
    nuevoNumero,
    eliminarNum,
    eliminarNums
  };

  return <UserContext.Provider value={data}> {children} </UserContext.Provider>
}

export {UserProvider};
export default UserContext;