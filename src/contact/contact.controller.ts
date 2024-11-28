import { Auth } from 'src/common/decorators/auth.decorator';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { FilterContactWithPaginationDto } from './dto/filter-contact.dto';
import { UniqueIdDTO } from 'src/common/dtos/unique_id.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('contacts')
@ApiTags('Contact')
@ApiOkResponse({ description: 'Success' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Invalid Parameters' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact message' })
  async create(@Body() createContactDto: CreateContactDto) {
    //send email to all admins
    await this.contactService.create(createContactDto);
    return { message: 'Request sent successfully. A response will be sent within an hour' };
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Retrieve all contact messages with pagination' })
  async findAll(@Query() filter: FilterContactWithPaginationDto) {
    return await this.contactService.findAll(filter);
  }

  @Get('/:id')
  @Auth()
  @ApiOperation({ summary: 'Retrieve a contact message by ID' })
  async findOne(@Param() uniqueIdDTO: UniqueIdDTO) {
    return await this.contactService.findOne({ _id: uniqueIdDTO.id });
  }

  // @Patch('/:id')
  // @ApiOperation({ summary: 'Update a contact message' })
  // @Auth()
  // async update(@Param() uniqueIdDTO: UniqueIdDTO, @Body() updateContactDto: UpdateContactDto) {
  //   return await this.contactService.update(uniqueIdDTO.id, updateContactDto);
  // }

  // @Delete('/:id')
  // @ApiOperation({ summary: 'Delete a contact message' })
  // @Auth()
  // async remove(@Param() uniqueIdDTO: UniqueIdDTO) {
  //   return await this.contactService.remove(uniqueIdDTO.id);
  // }
}
