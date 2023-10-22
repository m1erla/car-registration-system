package com.backend.business.concretes;

import com.backend.dataAccess.abstracts.UserRepository;

import com.backend.entities.concretes.User;
import com.backend.security.JwtUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceManager implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsServiceManager(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        return JwtUserDetails.create(user);
    }

    public UserDetails loadUserById(int id){
        User user = userRepository.findById(id).get();
        return JwtUserDetails.create(user);
    }
}
