import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import MessageImpl from '../database/entity/message.entity';
import Message from './models/message.model';
import MessageRegisterDto from './models/dtos/message-register.dto';
import UserImpl from '../database/entity/user.entity';
import RoomImpl from '../database/entity/room.entity';
import MessageUpdateDto from './models/dtos/message-update.dto';
import RoomService from '../rooms/room.service';
import MessageSearchDto from './models/dtos/message-search.dto';

@Injectable()
export default class MessageService {
  constructor(
    @InjectRepository(MessageImpl)
    private readonly repository: Repository<MessageImpl>,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
  ) {}

  async findAll(requestEntity: MessageSearchDto): Promise<Message[]> {
    const where: FindOptionsWhere<MessageImpl> = {};

    if (requestEntity.roomId) {
      where['room'] = { id: requestEntity.roomId };
    }

    if (requestEntity.userId) {
      where['user'] = { id: requestEntity.userId };
    }

    return await this.repository.find({
      where: where,
      relations: {
        room: true,
        user: true,
      },
    });
  }

  async findById(id: string): Promise<Message> {
    const entity = await this.repository.findOne({
      where: { id },
      withDeleted: true,
      relations: {
        room: true,
        user: true,
      },
    });

    if (!entity) {
      throw new NotFoundException('message not found');
    }

    return entity;
  }

  async register(requestEntity: MessageRegisterDto): Promise<Message> {
    const room = await this.roomService.findById(requestEntity.roomId);

    if (
      !room.participants.some(
        (participant) => participant.id === requestEntity.userId,
      )
    ) {
      throw new BadRequestException('User is not a participant in this room');
    }

    const entity = await this.repository.save(
      new MessageImpl({
        text: requestEntity.text,
        user: new UserImpl({ id: requestEntity.userId }),
        room: new RoomImpl({ id: requestEntity.roomId }),
      }),
    );

    return await this.findById(entity.id);
  }

  async update(id: string, requestEntity: MessageUpdateDto): Promise<void> {
    const entity = await this.findById(id);
    await this.repository.save({ ...entity, text: requestEntity.text });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete({ id });
  }
}
