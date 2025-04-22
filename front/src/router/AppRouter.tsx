import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { IngresarProductos } from '../pages/IngresarProductos';
import { VehiculoPage } from '../pages/VehiculoPage';
import { Administracion } from '../pages/Administracion';
import { ListaProductos } from '../pages/ListaProductos';
import { ListaUsuarios } from '../pages/ListaUsuarios';
import { Caracteristicas } from '../pages/Caracteristicas';
import { Categorías } from '../pages/Categorías';
import { ListaFavoritos } from '../pages/ListaFavoritos';
import { ReservaConfirmacion } from '../pages/ReservaConfirmacion';
import { ReservaHistorial } from '../pages/ReservaHistorial';


export const AppRouter = () => {
    return (
        <Routes>
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/Caracteristicas" element={<Caracteristicas />} />
          <Route path="/Categorias/AgregarCategorias" element={<Categorías />} />
          <Route path="/Categorias/EliminarCategorias" element={<Categorías />} />
          <Route path="/IngresarProductos" element={<IngresarProductos />} />
          <Route path="/ListaFavoritos" element={<ListaFavoritos />} />
          <Route path="/ListaProductos" element={<ListaProductos />} />
          <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ReservaConfirmación" element={<ReservaConfirmacion />} />
          <Route path="/ReservaHistorial" element={<ReservaHistorial />} />
          <Route path="/Vehiculo/*" element={<VehiculoPage />} />
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      );
}
