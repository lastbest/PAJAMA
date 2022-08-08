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

    // room_idx
//    @ManyToOne
//    @JoinColumn(name = "room_idx")
//    private Room room;

    // user_idx
//    @ManyToOne
//    @JoinColumn(name = "user_idx")
//    private User user;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int participant_idx;
    @Column(name = "participant_room")
    private int participantRoom;
    @Column(name = "participant_user")
    private String participantUser;
}
