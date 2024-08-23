import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { SendMailDTO } from './mail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Send simple mail to anyone, with base template applied',
  })
  create(@Body() sendMailDTO: SendMailDTO) {
    return this.mailService.sendSimpleMail(sendMailDTO);
  }
}
