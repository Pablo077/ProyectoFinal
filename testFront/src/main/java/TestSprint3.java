public class TestSprint3 {
    private testTools tools = new testTools();

    public void cargarPaginaPrincipal(String link){
        tools.loadPage(link);
    }

    public void loadAgregarCategoria(String link, String user){
        tools.loginPage(link, user);
    }

    public void loadEliminarCategoira(String link, String user){
        tools.loginPage(link, user);
    }

    public void loadListaFavoritos(String link, String user){
        tools.loginPage(link, user);
    }

    public void loadDetalleVehiculo(String link){
        tools.loadPage(link);
    }

    public void loadDetalleVehiculoUser(String link, String user){
        tools.loginPage(link, user);
    }

    public static void main(String[] args) {
        TestSprint3 test = new TestSprint3();
        TestData data = new TestData();

        test.cargarPaginaPrincipal("http://localhost:5173/");
        test.loadAgregarCategoria("http://localhost:5173/Categorias/AgregarCategorias", data.ADMIN);
        test.loadEliminarCategoira("http://localhost:5173/Categorias/EliminarCategorias", data.ADMIN);
        test.loadListaFavoritos("http://localhost:5173/ListaFavoritos", data.USER);
        test.loadDetalleVehiculo("http://localhost:5173/Vehiculo/?vehiculoId=2");
        test.loadDetalleVehiculoUser("http://localhost:5173/Vehiculo/?vehiculoId=8", data.USER);

    }
}
