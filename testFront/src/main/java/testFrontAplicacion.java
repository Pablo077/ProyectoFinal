import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;



public class testFrontAplicacion {

    public static void main(String[] args){
        testTools tools = new testTools();
        tools.loadPage("http://localhost:5173/");
    }
}
