package com.c203.api.service;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;
import com.c203.db.Entity.Room;
import com.c203.db.Entity.RoomDeco;
import com.c203.db.Repository.RoomDecoRepository;
import com.c203.db.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomDecoRepository roomDecoRepository;

    @Override
    public RoomDecoDto createRoom(RoomCreateDto roomCreateDto) {
        Room room = new Room();
        RoomDeco roomDeco = new RoomDeco();
        roomDeco.setRoomdeco_bg(roomCreateDto.getPartyBg());
        roomDeco.setRoomdeco_candle(roomCreateDto.getPartyCandle());
        roomDeco.setRoomdeco_object(roomCreateDto.getPartyCake());
        room.setRoom_date(roomCreateDto.getPartyDate());
        room.setRoom_opendate(LocalDateTime.now());
        room.setRoom_host(roomCreateDto.getPartyHost());
        room.setRoom_name(roomCreateDto.getPartyName());
        // 저장
        roomRepository.save(room);
        roomDecoRepository.save(roomDeco);
        // 리턴
        RoomDecoDto roomDecoDto = new RoomDecoDto();
        roomDecoDto.setRoomId(roomDeco.getRoomdeco_idx());
        roomDecoDto.setBg(roomDeco.getRoomdeco_bg());
        roomDecoDto.setCandle(roomDeco.getRoomdeco_candle());
        roomDecoDto.setObject(roomDeco.getRoomdeco_object());
        // 암호화 하기
        int num = room.getRoom_idx();


        return roomDecoDto;
    }
}
