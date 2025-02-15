import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { IngresarProductos } from '../pages/IngresarProductos';
import { VehiculoPage } from '../pages/VehiculoPage';
import { Administracion } from '../pages/Administracion';
import { ListaProductos } from '../pages/ListaProductos';
import { ListaUsuarios } from '../pages/ListaUsuarios';


export const AppRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/IngresarProductos" element={<IngresarProductos />} />
          <Route path="/ListaProductos" element={<ListaProductos />} />
          <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Vehiculo" element={<VehiculoPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
}
