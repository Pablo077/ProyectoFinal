public class TestSprint4 {
    private testTools tools = new testTools();

    public void cargarPaginaPrincipal(String link){
        tools.loadPage(link);
    }

    public void cargarLogin(String link){
        tools.loadPage(link);
    }

    public void loadDetalleVehiculoUser(String link, String user){
        tools.loginPage(link, user);
    }

    public void loadReservaHistorial(String link, String user){
        tools.loginPage(link, user);
    }

    public static void main(String[] args) {
        TestSprint4 test = new TestSprint4();
        TestData data = new TestData();

        test.cargarPaginaPrincipal("http://localhost:5173/");
        test.cargarLogin("http://localhost:5173/Login");
        test.loadDetalleVehiculoUser("http://localhost:5173/Vehiculo/?vehiculoId=9", data.USER);
        test.loadReservaHistorial("http://localhost:5173/ReservaHistorial", data.USER);


    }
}
