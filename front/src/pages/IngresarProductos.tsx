import { Footer } from "../views/Home/Footer"
import { Navbar } from "../views/Home/Navbar"
import { IngresarProductosViews } from "../views/IngresarProductos/IngresarProductosViews"


export const IngresarProductos = () => {
  return (
    <div>
          <Navbar />
          <div style={{ color: "white", marginTop: "100px", flex: 1 }}>
            <IngresarProductosViews />
          </div>
    
          <div style={{ marginTop: "80px" }}>
            <Footer />
          </div>
        </div>
  )
}
