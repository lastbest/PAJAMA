package com.c203.api.service;

import com.c203.api.dto.Picture.PictureRegistDto;
import com.c203.db.Entity.Picture;
import com.c203.db.Repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private EncryptionService encryptionService;

    @Autowired
    private PictureRepository pictureRepository;

    // 사진 저장
    @Override
    public boolean registPicture(PictureRegistDto pictureRegistDto) throws Exception {
        String temp = encryptionService.decrypt(pictureRegistDto.getRoomIdx());
        int id = Integer.parseInt(temp);
        Picture picture = new Picture();
        picture.setPicture(pictureRegistDto.getPicture());
        picture.setPicture_roomIdx(id);
        picture.setPicture_time(LocalDateTime.now());
        pictureRepository.save(picture);
        return true;
    }
}
