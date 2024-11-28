import { Auth, CurrentUser } from 'src/common/decorators/auth.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewWithPaginationDto } from './dto/filter-review.dto';
import { IUserDocument } from 'src/user/user.interface';
import { ReviewService } from './review.service';
import { UniqueIdDTO } from 'src/common/dtos/unique_id.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('review')
@ApiTags('App Review')
@ApiOkResponse({ description: 'Success' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Invalid Parameters' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @Auth()
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() auth: IUserDocument) {
    const isDuplicate = await this.reviewService.findOne({ user: auth.id });
    if (isDuplicate) return { message: 'App rating already exists', data: isDuplicate };
    // throw new BadRequestException('App rating already exists');

    createReviewDto.user = auth.id;
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reviews with pagination' })
  async findAll(@Query() filter: FilterReviewWithPaginationDto) {
    return await this.reviewService.findAll(filter);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a review by ID' })
  async findOne(@Param() uniqueIdDTO: UniqueIdDTO) {
    return await this.reviewService.findOne({ _id: uniqueIdDTO.id });
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing review' })
  @Auth()
  async update(@Param() uniqueIdDTO: UniqueIdDTO, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(uniqueIdDTO.id, updateReviewDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a review' })
  @Auth()
  async remove(@Param() uniqueIdDTO: UniqueIdDTO) {
    return await this.reviewService.remove(uniqueIdDTO.id);
  }
}
