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
import User from '../../users/model/user.model';
import RoomImpl from './room.entity';

@Entity({
  name: 'users',
})
export default class UserImpl extends User {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: string;

  @Column({
    name: 'username',
    unique: true,
  })
  username: string;

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

  @ManyToMany(() => RoomImpl)
  @JoinTable({
    name: 'room_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
  })
  rooms: RoomImpl[];

  constructor(entity?: Partial<User>) {
    super();
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
