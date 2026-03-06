package org.example.be.services;

import org.example.be.dto.LoginDTO;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.UnauthorizedException;
import org.example.be.security.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserSecurityService us;
    private final JWTTools jw;
    private final PasswordEncoder pw;

    @Autowired
    public AuthService(UserSecurityService us, JWTTools jw, PasswordEncoder pw) {
        this.us = us;
        this.jw = jw;
        this.pw = pw;
    }

    public String checkCredentialsAndGenerateToken(LoginDTO body) {
        UserSecurity f = this.us.findUserSecurityByUsername(body.username());
        if (pw.matches(body.password(), f.getPassword())) {
            String Token = jw.generateToken(f);
            return Token;
        } else {
            throw new UnauthorizedException("Incorrect credentials!");
        }
    }
}
