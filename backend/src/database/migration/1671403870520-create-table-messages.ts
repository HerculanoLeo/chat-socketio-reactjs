import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableMessages1671403870520 implements MigrationInterface {
  private readonly messagesTable = new Table({
    name: 'messages',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        primaryKeyConstraintName: 'PK_messages',
        generationStrategy: 'uuid',
        isGenerated: true,
      },
      {
        name: 'text',
        type: 'text',
        isNullable: false,
      },
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

  private readonly messagesFKs = [
    new TableForeignKey({
      name: 'FK_messages_user',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }),
    new TableForeignKey({
      name: 'FK_messages_room',
      columnNames: ['room_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'rooms',
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.messagesTable);
    await queryRunner.createForeignKeys(this.messagesTable, this.messagesFKs);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.messagesTable, this.messagesFKs);
    await queryRunner.dropTable(this.messagesTable);
  }
}
