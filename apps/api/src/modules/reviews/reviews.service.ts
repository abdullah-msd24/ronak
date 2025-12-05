import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User, event: Event): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      event,
    });
    return this.reviewRepository.save(review);
  }

  async findAllByEvent(eventId: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { event: { id: eventId } }, relations: ['user'] });
  }

  async findAllByUser(userId: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { user: { id: userId } }, relations: ['event'] });
  }

  async remove(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}