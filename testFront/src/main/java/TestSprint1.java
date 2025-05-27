public class TestSprint1 {
    private testTools tools = new testTools();

    public void loadPage(String link) {
        tools.loadPage(link);
    }

    public void loginPageAdmin(String user){
        tools.loginPage(null, user);
    }

    public void mostrarDetalleVehiculo(String link){
        tools.loadPage(link);
    }

    public void ingresarProductos(String link, String user){
        tools.loginPage(link, user);
    }

    public void ingresarAdministracion(String link, String user){
        tools.loginPage(link, user);
    }

    public void ingresarListaProductos(String link, String user){
        tools.loginPage(link, user);
    }

    public static void main(String[] args) {
        TestSprint1 test = new TestSprint1();
        TestData data = new TestData();

        test.loadPage("http://localhost:5173/");
        test.loginPageAdmin(data.ADMIN);
        test.mostrarDetalleVehiculo("http://localhost:5173/Vehiculo/?vehiculoId=3");
        test.ingresarProductos("http://localhost:5173/IngresarProductos", data.ADMIN);
        test.ingresarAdministracion("http://localhost:5173/administracion", data.ADMIN);
        test.ingresarListaProductos("http://localhost:5173/ListaProductos", data.ADMIN);
    }


}