import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Room from './models/room.model';
import { InjectRepository } from '@nestjs/typeorm';
import UserImpl from '../database/entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import RoomImpl from '../database/entity/room.entity';
import RoomRegisterDto from './models/dtos/room-register.dto';
import RoomUpdateDto from './models/dtos/room-update.dto';
import RoomSearchDto from './models/dtos/room-search.dto';
import ChatGateway from '../chat/chat.gateway';

@Injectable()
export default class RoomService {
  constructor(
    @InjectRepository(RoomImpl)
    private readonly repository: Repository<RoomImpl>,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
  ) {}

  async findAll(requestEntity: RoomSearchDto): Promise<Room[]> {
    const where: FindOptionsWhere<RoomImpl> = {};

    if (requestEntity.userId) {
      where['participants'] = { id: requestEntity.userId };
    }

    return await this.repository.find({
      where,
      relations: {
        participants: true,
      },
    });
  }

  async findById(id: string): Promise<Room> {
    const entity = await this.repository.findOne({
      where: { id },
      withDeleted: true,
      relations: {
        participants: true,
      },
    });

    if (!entity) {
      throw new NotFoundException('room not found');
    }

    return entity;
  }

  async register(requestEntity: RoomRegisterDto): Promise<Room> {
    const entity = await this.repository.save(
      new RoomImpl({
        name: requestEntity.name,
        participants: requestEntity.participants.map(
          (p) => new UserImpl({ id: p }),
        ),
      }),
    );

    const room = await this.findById(entity.id);

    await this.chatGateway.emitRoom(room);

    return room;
  }

  async update(id: string, requestEntity: RoomUpdateDto): Promise<void> {
    const entity = await this.findById(id);

    const oldParticipantsIds = entity.participants
      .filter((p) => !requestEntity.participants.some((id) => id === p.id))
      .map((p) => p.id);

    const updatedEntity = new RoomImpl({
      ...entity,
      name: requestEntity.name,
      participants:
        requestEntity.participants?.map((p) => new UserImpl({ id: p })) ??
        entity.participants,
    });
    await this.repository.save(updatedEntity);

    await this.chatGateway.emitRoom(updatedEntity, oldParticipantsIds);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.repository.softDelete({ id });
  }
}
