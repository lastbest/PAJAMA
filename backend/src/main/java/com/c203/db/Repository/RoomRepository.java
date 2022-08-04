package com.c203.db.Repository;

import com.c203.db.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
   // @Query(value = "delete Room r where r.roomIdx = :roomIdx and r.roomHost = :roomHost")
    void deleteByRoomIdxAndRoomHost(int roomIdx,String roomHost);
    Room findByRoomIdxAndRoomHost(int roomIdx, String roomHost);
}
