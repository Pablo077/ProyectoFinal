public class TestSprint2 {
    private testTools tools = new testTools();


    public void loadPageUser(String user){
        tools.loginPage(null, user);
    }

    public void verCaracteristicas(String link, String user){
        tools.loginPage(link, user);
    }

    public void verListaProductos(String link, String user){
        tools.loginPage(link, user);
    }

    public void cargarLogin(String link){
        tools.loadPage(link);
    }

    public void cargarRegistro(String link){
        tools.loadPage(link);
    }

    public void cargarDetalleVehiculo(String link){
        tools.loadPage(link);
    }

    public static void main(String[] args) {
        TestSprint2 test = new TestSprint2();
        TestData data = new TestData();
        test.loadPageUser(data.USER);
        test.verCaracteristicas("http://localhost:5173/Caracteristicas", data.ADMIN);
        test.verListaProductos("http://localhost:5173/ListaProductos", data.ADMIN);
        test.cargarLogin("http://localhost:5173/Login");
        test.cargarRegistro("http://localhost:5173/Register");
        test.cargarDetalleVehiculo("http://localhost:5173/Vehiculo/?vehiculoId=7");

    }
}
