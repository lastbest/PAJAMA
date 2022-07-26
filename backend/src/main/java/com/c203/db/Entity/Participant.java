package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Participant {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int participant_idx;

    private int participant_room;
    private int participant_user;
}
