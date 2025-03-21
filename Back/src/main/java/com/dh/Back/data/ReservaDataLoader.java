package com.dh.Back.data;
import com.dh.Back.entity.Reserva;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.time.LocalDate;

@Component
public class ReservaDataLoader {

    private final UserDataLoader users;
    private final VehiculoDataLoader vehiculos;

    @Autowired
    public ReservaDataLoader(UserDataLoader users, VehiculoDataLoader vehiculos) {
        this.users = users;
        this.vehiculos = vehiculos;
    }

    public List<Reserva> getReservas() {
        return List.of(
                new Reserva(users.getUser().get(1), vehiculos.getVehiculos().get(0), LocalDate.parse("2025-03-20"), LocalDate.parse("2025-03-25")),
                new Reserva(users.getUser().get(1), vehiculos.getVehiculos().get(0), LocalDate.parse("2025-03-20"), LocalDate.parse("2025-03-25")),
                new Reserva(users.getUser().get(1), vehiculos.getVehiculos().get(0), LocalDate.parse("2025-04-01"), LocalDate.parse("2025-04-20"))
        );
    }
}