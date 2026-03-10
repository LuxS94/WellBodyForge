package org.example.be.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.UnauthorizedException;
import org.example.be.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTCheckerFilter extends OncePerRequestFilter {

    private final JWTTools jwtTools;
    private final UserSecurityService us;

    @Autowired
    public JWTCheckerFilter(JWTTools jwtTools, UserSecurityService us) {
        this.jwtTools = jwtTools;
        this.us = us;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer "))
            throw new UnauthorizedException("Enter the token in the header in the correct format" + authorization);

        String accessToken = authorization.replace("Bearer ", "");

        jwtTools.verifyToken(accessToken);

        String userId = jwtTools.getIdByToken(accessToken);

        UserSecurity user = us.findUserSecurityById(userId);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/**", request.getServletPath()) || new AntPathMatcher().match("/food/f/**", request.getServletPath());
    }
}

