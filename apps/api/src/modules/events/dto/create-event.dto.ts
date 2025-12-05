import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNotEmpty()
  maxParticipants: number;

  @IsString()
  @IsOptional()
  bannerUrl?: string;
}