package com.sample.doctorsdemo.controller;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class UserInfoController {

    private final AuthenticationInfoProvider authenticationInfoProvider;

    public UserInfoController(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    /**
     * Provides information about an authenticated user. If there is no authenticated user, the {@link AccessDeniedException} is thrown.
     *
     * @return {@link UserInfo} with information about an authenticated user.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping("userInfo")
    public UserInfo userInfo() {
        String currentUsername = authenticationInfoProvider.getPreferredUsername();
        if (currentUsername != null) {
            return new UserInfo(currentUsername);
        }
        throw new AccessDeniedException("Unable to extract authenticated user information");
    }

    /**
     * Provides information about the authorities of an authenticated user.
     *
     * @return a list that contains the authorities of an authenticated user.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping("userPermissions")
    public List<String> userPermissions(Principal principal) {
        if (principal instanceof Authentication) {
            return ((Authentication) principal)
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public static class UserInfo {
        private final String username;

        public UserInfo(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }
    }
}
