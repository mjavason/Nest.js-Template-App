import { BadRequestException, Injectable } from '@nestjs/common';
import { Document, FilterQuery } from 'mongoose';
import { getUTCMonthStartAndEnd } from '../utils/date.util';
import { PaginateModel } from '../interfaces';

@Injectable()
export class GenericService<T extends Document> {
  private model: PaginateModel<T>;
  constructor(private readonly _model: any) {
    this.model = _model;
  }

  async create(createDto: Partial<T>) {
    return await this.model.create(createDto);
  }

  async findAll(filter: FilterQuery<T>) {
    const page = filter.pagination_page ?? 1;
    const size = filter.pagination_size ?? 10;

    delete filter.pagination_page;
    delete filter.pagination_size;

    return await this.model.paginate(filter, { limit: size, page: page });
  }

  async findAllNoPagination(filter: FilterQuery<T>) {
    return await this.model.find(filter).sort({ createdAt: 'desc' });
  }

  async findAllNoAutoPopulate(filter: FilterQuery<T>) {
    // Model.find(query).setOptions({ autopopulate: false });
    return await this.model
      .find(filter)
      .sort({ createdAt: 'desc' })
      .setOptions({ autopopulate: false });
  }

  async findOne(filter: FilterQuery<T>) {
    return await this.model.findOne(filter);
  }

  async findOneNoAutoPopulate(filter: FilterQuery<T>) {
    return await this.model.findOne(filter).setOptions({ autopopulate: false });
  }

  async getMonthlyGrowth(filter: FilterQuery<T>) {
    const now = new Date();
    const prevMonth = getUTCMonthStartAndEnd(now.getFullYear(), now.getMonth() - 1);
    const currMonth = getUTCMonthStartAndEnd(now.getFullYear(), now.getMonth());

    // console.log('start of previous month', prevMonth.startDate);
    // console.log('end of previous month', prevMonth.endDate);
    // console.log('start of current month', currMonth.startDate);

    const result = await this.model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: { $gte: prevMonth.startDate }, // Items from previous month to the start of the current month
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { year: '$year', month: '$month' },
          itemCount: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    // console.log(result);

    // Extract counts for the previous and current month
    const previousMonthCount =
      result.find(
        (entry) =>
          entry._id.year === prevMonth.startDate.getFullYear() &&
          entry._id.month === prevMonth.startDate.getMonth() + 1,
      )?.itemCount || 0;

    const currentMonthCount =
      result.find(
        (entry) =>
          entry._id.year === currMonth.startDate.getFullYear() &&
          entry._id.month === currMonth.startDate.getMonth() + 1,
      )?.itemCount || 0;

    // Calculate the percentage difference
    const percentageDifference =
      previousMonthCount === 0
        ? currentMonthCount > 0
          ? 100
          : 0
        : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

    return { percentageDifference, currentMonthCount, previousMonthCount };
  }

  async getTotalItems(filter: FilterQuery<T>) {
    const result = await this.model.aggregate([
      {
        $match: filter,
      },
      {
        $count: 'total', // Count all matching items
      },
    ]);

    return result[0]?.total || 0; // Return the count or 0 if no items found
  }

  async update(id: string, updateDto: Partial<T>) {
    const result = await this.model.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    if (!result) {
      throw new BadRequestException('Unable to update entity, it doesnt exist?');
    }

    return result;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new BadRequestException('Unable to delete entity, it doesnt exist?');
    }

    return result;
  }

  async calculateWeeklyReport(filter: FilterQuery<T>) {
    const report = await this.model.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: { dayOfWeek: { $dayOfWeek: '$createdAt' } }, // Group by day of the week (1=Sunday, 7=Saturday)
          total: { $sum: 1 }, // Sum the total sales for each day
          // total: { $sum: '$totalAmount' }, // Sum the total sales for each day
        },
      },
      {
        $sort: { '_id.dayOfWeek': 1 }, // Sort by day of the week
      },
      {
        $project: {
          dayOfWeek: '$_id.dayOfWeek',
          total: 1,
          _id: 0, // Remove the _id field for cleaner output
        },
      },
    ]);

    // Initialize all days of the week with zero sales
    const dayNames = [
      '',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const fullWeek = dayNames.slice(1).map((day, index) => ({
      dayOfWeek: day,
      total: 0,
    }));

    // Merge existing sales data with the initialized week
    report.forEach((report) => {
      const dayIndex = report.dayOfWeek - 1; // Convert MongoDB's 1-indexed dayOfWeek to 0-indexed
      fullWeek[dayIndex].total = report.total;
    });

    return fullWeek;
  }
}
