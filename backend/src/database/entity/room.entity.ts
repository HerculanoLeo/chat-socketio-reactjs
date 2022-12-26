import Room from '../../rooms/models/room.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import UserImpl from './user.entity';

@Entity({
  name: 'rooms',
})
export default class RoomImpl extends Room {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

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

  @ManyToMany(() => UserImpl)
  @JoinTable({
    name: 'room_user',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  participants: UserImpl[];

  constructor(entity?: Partial<Room>) {
    super();
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
