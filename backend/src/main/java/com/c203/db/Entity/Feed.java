package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Feed {
//
//    @ManyToOne
//    @JoinColumn(name = "user_idx")
//    private User user;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int feed_idx;

    private int feed_user;
    private String feed_description;
    private LocalDate feed_time;
}
