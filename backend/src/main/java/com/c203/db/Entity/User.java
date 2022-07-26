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

    @OneToMany(mappedBy = "user")
    private List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Letter> letters = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Feed> feeds = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Participant> participants = new ArrayList<>();

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int user_idx;

    private String user_id;
    private String user_name;
    private String user_pwd;
    private String user_email;
    private String user_nickname;
    private LocalDate user_birthday;
}
