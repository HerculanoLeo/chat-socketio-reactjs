import Message from '../../messages/models/message.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import UserImpl from './user.entity';
import RoomImpl from './room.entity';

@Entity({
  name: 'messages',
})
export default class MessageImpl extends Message {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'text',
  })
  text!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  deletedAt?: Date;

  @VersionColumn({
    name: 'version',
  })
  version: number;

  @ManyToOne(() => UserImpl)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: UserImpl;

  @ManyToOne(() => RoomImpl)
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'id',
  })
  room!: RoomImpl;

  constructor(entity?: Partial<Message>) {
    super();
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
