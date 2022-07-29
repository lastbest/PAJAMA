package com.c203.api.service;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;
import com.c203.db.Entity.Room;
import com.c203.db.Entity.RoomDeco;
import com.c203.db.Entity.User;
import com.c203.db.Repository.RoomDecoRepository;
import com.c203.db.Repository.RoomRepository;
import com.c203.db.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;
    private RoomDecoRepository roomDecoRepository;

    @Override
    public RoomDecoDto createRoom(RoomCreateDto roomCreateDto) {
        Room room = new Room();
        RoomDeco roomDeco = new RoomDeco();
        RoomDecoDto roomDecoDto = new RoomDecoDto();
        return roomDecoDto;
    }
}
