package com.c203.db.Repository;

import com.c203.db.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserEmailAndUserPwd(String userEmail,String userPwd);
    Optional<User> findByUserEmail(String userEmail);

    void deleteByUserEmail(String decodeEmail);
    //Optional<User> findByUserNikcNameAndUserEmail(String userNickName,String userEmail);
}
