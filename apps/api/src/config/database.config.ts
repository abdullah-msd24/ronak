import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Event } from '../modules/events/entities/event.entity';
import { EventExperience } from '../modules/experiences/entities/event-experience.entity';
import { Community } from '../modules/communities/entities/community.entity';
import { Review } from '../modules/reviews/entities/review.entity';
import { ChatRoom } from '../modules/chat/entities/chat-room.entity';
import { Message } from '../modules/chat/entities/message.entity';
import { Notification } from '../modules/notifications/entities/notification.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Event,
    EventExperience,
    Community,
    Review,
    ChatRoom,
    Message,
    Notification,
  ],
  synchronize: true, // Set to false in production
  logging: true, // Enable logging for debugging
};