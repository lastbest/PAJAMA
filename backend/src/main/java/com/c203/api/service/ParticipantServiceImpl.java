package com.c203.api.service;

import com.c203.db.Entity.Participant;
import com.c203.db.Repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipantServiceImpl implements ParticipantService{
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private ParticipantRepository participantRepository;
    @Override
    public boolean registParticipant(String roomIdx,String email) throws Exception {
        String temp = encryptionService.decrypt(roomIdx);
        int id = Integer.parseInt(temp); // room_idx
        Participant participant = new Participant();
        participant.setParticipantRoom(id);
        participant.setParticipantUser(email);
        participantRepository.save(participant);
        return true;
    }
}
