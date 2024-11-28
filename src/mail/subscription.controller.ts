import { Auth } from 'src/common/decorators/auth.decorator';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMailSubscriptionDto } from './dto/create-subscription.dto';
import { FilterMailSubscriptionWithPaginationDto } from './dto/filter-subscription.dto';
import { MailService } from './mail.service';
import { MailSubscriptionService } from './subscription.service';
import { SendMailParamsDTO } from './mail.dto';
import { UniqueIdDTO } from 'src/common/dtos/unique_id.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('mail-subscription')
@ApiTags('Mail Subscription')
@ApiOkResponse({ description: 'Success' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Invalid Parameters' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class MailSubscriptionController {
  constructor(
    private readonly mailSubscriptionService: MailSubscriptionService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @Auth()
  async create(@Body() createMailSubscriptionDto: CreateMailSubscriptionDto) {
    return await this.mailSubscriptionService.create(createMailSubscriptionDto);
  }

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast mail to all subscribers' })
  @Auth()
  async broadcast(@Body() broadcast: SendMailParamsDTO) {
    const subscribers = await this.mailSubscriptionService.findAllNoPagination({});
    for (let i = 0; i < subscribers.length; i++) {
      await this.mailService.sendSimpleMail({ email: subscribers[i].emailAddress, ...broadcast });
    }

    return { message: 'Mail broadcast to all subscribers successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all subscriptions with pagination' })
  async findAll(@Query() filter: FilterMailSubscriptionWithPaginationDto) {
    return await this.mailSubscriptionService.findAll(filter);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a subscription by ID' })
  async findOne(@Param() uniqueIdDTO: UniqueIdDTO) {
    return await this.mailSubscriptionService.findOne({ _id: uniqueIdDTO.id });
  }

  //   @Patch('/:id')
  //   @ApiOperation({ summary: 'Update an existing subscription' })
  //   @Auth()
  //   async update(
  //     @Param() uniqueIdDTO: UniqueIdDTO,
  //     @Body() updateMailSubscriptionDto: UpdateMailSubscriptionDto,
  //   ) {
  //     return await this.mailSubscriptionService.update(uniqueIdDTO.id, updateMailSubscriptionDto);
  //   }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a subscription' })
  @Auth()
  async remove(@Param() uniqueIdDTO: UniqueIdDTO) {
    return await this.mailSubscriptionService.remove(uniqueIdDTO.id);
  }
}
