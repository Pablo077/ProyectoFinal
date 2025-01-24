import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { IngresarProductos } from '../pages/IngresarProductos';


export const AppRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/IngresarProductos" element={<IngresarProductos />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
}
