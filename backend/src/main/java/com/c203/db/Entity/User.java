package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

//    @OneToMany(mappedBy = "user1")
//    private List<Room> rooms = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user2")
//    private List<Letter> letters = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user3")
//    private List<Feed> feeds = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user4")
//    private List<Participant> participants = new ArrayList<>();

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer user_idx;

    @Column(name = "user_id")
    private String userId;
    private String user_name;
    @Column(name = "user_pwd")
    private String userPwd;
    private String user_email;
    private String user_nickname;
    private LocalDate user_birthday;
}
