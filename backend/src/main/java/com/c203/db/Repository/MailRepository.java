package com.c203.db.Repository;

import com.c203.db.Entity.Auth;
import com.c203.db.Entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MailRepository extends JpaRepository<Auth, Integer> {
//    List<Auth> findById(String id, int number, String type);
//    void deleteById(String id);
}
