package com.dh.Back.data;
import com.dh.Back.entity.User;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class UserDataLoader {
    public List<User> getUser(){

        User admin = new User();
        admin.setId(1L);
        admin.setFirstname("Juan");
        admin.setLastname("Perez");
        admin.setEmail("admin@gmail.com");
        admin.setPassword("1234");

        User user = new User();
        user.setId(2L);
        user.setFirstname("Pedro");
        user.setLastname("Diaz");
        user.setEmail("user@gmail.com");
        user.setPassword("1234");

        return List.of(
                admin,
                user
        );
    }
}
