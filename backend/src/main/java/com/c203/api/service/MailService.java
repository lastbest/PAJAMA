package com.c203.api.service;

import com.c203.api.dto.MailCheckDto;
import com.c203.api.dto.MailSendDto;

public interface MailService {
    void mailSend(MailSendDto mailSendDto);
    String makeAuthNumber();

    boolean mailCheck(String authNumber, String email);
}
