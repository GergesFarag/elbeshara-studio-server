import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';
import { AuthGuard } from '../modules/auth/guards/auth.guard';

@Controller('mail')
@UseGuards(AuthGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendMail(@Body() sendEmailDto: SendEmailDto) {
    return this.mailService.sendMail(sendEmailDto);
  }
}
