package com.dh.Back.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationUpdate {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String rol;
}
