import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class testTools {
    public void loadPage(String link){
        String pathChrome = "C:\\Users\\pfbpc\\OneDrive\\Otros\\Archivos\\Documents\\chromedriver.exe";
        System.setProperty("webdriver.chrome.driver", pathChrome);
        WebDriver driver = new ChromeDriver();
        driver.get(link);
        driver.quit();
    }

    public void loginPage(String link, String user){
        String pathChrome = "C:\\Users\\pfbpc\\OneDrive\\Otros\\Archivos\\Documents\\chromedriver.exe";
        System.setProperty("webdriver.chrome.driver", pathChrome);
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:5173/Login");
        WebElement email = driver.findElement(By.xpath("//input[@id='email']"));
        email.sendKeys(user);
        WebElement password = driver.findElement(By.xpath("//input[@id='password']"));
        password.sendKeys("1234");
        WebElement sendButton = driver.findElement(By.xpath("//button[text()='Ingresar']"));
        sendButton.click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        if (link != null && !link.isBlank()) {
            if(user.equals("admin@gmail.com")){
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[text()='Agregar producto']")));
                driver.navigate().to(link);
            }
            if(user.equals("user@gmail.com")){
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h5[text()='Buscar']")));
                driver.navigate().to(link);
            }
        }

        WebElement logoutLink = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[text()='Cerrar sesión']")));
        logoutLink.click();
        driver.quit();
    }
}
