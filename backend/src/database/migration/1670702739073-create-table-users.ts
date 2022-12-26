import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUsers1670702739073 implements MigrationInterface {
  private readonly usersTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        primaryKeyConstraintName: 'PK_users',
        generationStrategy: 'uuid',
        isGenerated: true,
      },
      {
        name: 'username',
        type: 'varchar',
        length: '255',
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
    uniques: [
      {
        name: 'UQ_users_username',
        columnNames: ['username'],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable);
  }
}
