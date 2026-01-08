import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendMail(@Body() sendEmailDto: SendEmailDto) {
    return this.mailService.sendMail(sendEmailDto);
  }
}
