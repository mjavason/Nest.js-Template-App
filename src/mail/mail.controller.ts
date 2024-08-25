import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDTO } from './mail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({
    summary: 'Send simple mail to anyone, with base template applied',
  })
  @Auth()
  create(@Body() sendMailDTO: SendMailDTO) {
    return this.mailService.sendSimpleMail(sendMailDTO);
  }
}
