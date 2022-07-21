package com.c203;

import com.c203.db.Entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
//		EntityManagerFactory emf = Persistence.createEntityManagerFactory("practice" );
//		EntityManager em = emf.createEntityManager();
//		EntityTransaction tx = em.getTransaction();
//		tx.begin();
//		try{
//			User user = new User();
//			user.setUser_id("테스트");
//			tx.commit();
//		}catch (Exception e){
//			tx.rollback();
//		}finally {
//			em.close();
//		}
//		emf.close();
	SpringApplication.run(BackendApplication.class, args);
	}

}
