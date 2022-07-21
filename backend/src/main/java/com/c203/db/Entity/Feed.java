package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Feed {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int feed_idx;

    private int feed_user;
    private String feed_description;
    @Lob
    private Blob feed_picture;
}
