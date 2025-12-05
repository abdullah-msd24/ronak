import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { CommunitiesService } from '../communities/communities.service';
import { ReviewsService } from '../reviews/reviews.service';
import { ExperiencesService } from '../experiences/experiences.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
    private readonly communitiesService: CommunitiesService,
    private readonly reviewsService: ReviewsService,
    private readonly experiencesService: ExperiencesService,
  ) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async getAllEvents() {
    return this.eventsService.findAll();
  }

  async getAllCommunities() {
    return this.communitiesService.findAll();
  }

  async getAllExperiences() {
    return this.experiencesService.findAll();
  }

  async getAllReviews() {
    return this.reviewsService.findAll();
  }

  async removeUser(userId: string) {
    return this.usersService.remove(userId);
  }

  async removeEvent(eventId: string) {
    return this.eventsService.remove(eventId);
  }

  async removeCommunity(communityId: string) {
    return this.communitiesService.remove(communityId);
  }

  async removeExperience(experienceId: string) {
    return this.experiencesService.remove(experienceId);
  }

  async removeReview(reviewId: string) {
    return this.reviewsService.remove(reviewId);
  }

  // Additional admin functionalities can be added here
}