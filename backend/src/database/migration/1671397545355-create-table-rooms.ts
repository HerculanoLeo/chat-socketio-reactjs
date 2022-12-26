import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRooms1671397545355 implements MigrationInterface {
  private readonly roomsTable = new Table({
    name: 'rooms',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        primaryKeyConstraintName: 'PK_rooms',
        generationStrategy: 'uuid',
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'version',
        type: 'BigInt',
        isNullable: false,
      },
    ],
  });

  private readonly roomsUsersTable = new Table({
    name: 'room_user',
    columns: [
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'room_id',
        type: 'uuid',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        name: 'FK_room_user_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      },
      {
        name: 'FK_room_user_rooms',
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rooms',
      },
    ],
    uniques: [
      {
        name: 'UQ_room_user',
        columnNames: ['user_id', 'room_id'],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.roomsTable);
    await queryRunner.createTable(this.roomsUsersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.roomsUsersTable);
    await queryRunner.dropTable(this.roomsTable);
  }
}
