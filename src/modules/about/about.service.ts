import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { About } from './schema/about.schema';
import { Model } from 'mongoose';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<About>) {}
  find() {
    return this.aboutModel.findOne();
  }

  async update(updateDto: UpdateAboutDto) {
    const data = await this.aboutModel.findOneAndUpdate({}, updateDto, {
      new: true,
    });
    if (!data) throw new BadRequestException('No Data Found');
    return data.save();
  }
}
