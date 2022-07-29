package com.c203.api.service;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;

public interface RoomService {
    RoomDecoDto createRoom(RoomCreateDto roomCreateDto) ;
}
