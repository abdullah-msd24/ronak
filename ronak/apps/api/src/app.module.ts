import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { ChatModule } from './modules/chat/chat.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';
import { UploadModule } from './modules/upload/upload.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EventsModule,
    ExperiencesModule,
    CommunitiesModule,
    ChatModule,
    ReviewsModule,
    NotificationsModule,
    AdminModule,
    UploadModule,
    CommonModule,
  ],
})
export class AppModule {}