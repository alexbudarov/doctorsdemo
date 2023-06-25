package com.sample.doctorsdemo;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.auth.UserDetailsAuthenticationInfoProvider;
import com.amplicode.core.security.UnauthorizedStatusAuthenticationEntryPoint;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationFailureHandler;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationSuccessHandler;
import com.amplicode.core.security.formlogin.FormLoginLogoutSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {


    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new FormLoginAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new FormLoginAuthenticationFailureHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new FormLoginLogoutSuccessHandler();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new UnauthorizedStatusAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Authorize Requests
        http.authorizeRequests(authorizeRequests -> authorizeRequests
                .antMatchers("/graphql/**").permitAll()
                .antMatchers("/graphql").permitAll());
        //Headers management
        http.headers(Customizer.withDefaults());
        //Session management
        http.sessionManagement(Customizer.withDefaults());
        //Form login
        http.formLogin(formLogin -> formLogin
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler()));
        //Anonymous
        http.anonymous(Customizer.withDefaults());
        //CSRF
        http.csrf(AbstractHttpConfigurer::disable);
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(authenticationEntryPoint()));
        http.logout(logout -> logout
                .logoutSuccessHandler(logoutSuccessHandler()));
        return http.build();
    }

    @Bean
    public UserDetailsService inMemoryUserDetailsService() {
        // The builder will ensure the passwords are encoded before saving in memory
        User.UserBuilder users = User.withDefaultPasswordEncoder();
        InMemoryUserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
        userDetailsManager.createUser(users.username("admin")
                .password("admin")
                .roles("ADMIN")
                .build());
        userDetailsManager.createUser(users.username("user")
                .password("user")
                .roles("USER")
                .build());
        return userDetailsManager;
    }

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        return new UserDetailsAuthenticationInfoProvider();
    }
}