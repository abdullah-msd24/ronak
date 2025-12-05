import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { Message } from './entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createChatRoom(userIds: string[]): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({ userIds });
    return await this.chatRoomRepository.save(chatRoom);
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    const message = this.messageRepository.create(sendMessageDto);
    return await this.messageRepository.save(message);
  }

  async getMessages(chatRoomId: string): Promise<Message[]> {
    return await this.messageRepository.find({ where: { chatRoomId } });
  }

  async getChatRooms(userId: string): Promise<ChatRoom[]> {
    return await this.chatRoomRepository.find({ where: { userIds: userId } });
  }
}