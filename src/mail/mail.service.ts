import { BadRequestException, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}
  async sendMail(sendEmailDto: SendEmailDto) {
    try {
      const result = await this.mailer.sendMail({
        to: this.config.get<string>('ADMIN_EMAIL'),
        subject: sendEmailDto.subject,
        text: `Name: ${sendEmailDto.name}\nEmail: ${sendEmailDto.email}\nPhone: ${sendEmailDto.phone}\n\nMessage:\n${sendEmailDto.message}`,
      });
      if (!result) {
        throw new BadRequestException('Failed to send email');
      }
      return { status: 'success' };
    } catch (err) {
      throw new BadRequestException('Failed to send email : ', err);
    }
  }
}
