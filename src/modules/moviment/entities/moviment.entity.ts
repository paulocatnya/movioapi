import { User } from '../../user/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../comum';

export enum TypeMovimentEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

@Entity()
export class Moviment extends AbstractEntity {
  @Column({ type: 'enum', enum: TypeMovimentEnum })
  type!: TypeMovimentEnum;

  @Column()
  description!: string;

  @Column({ type: 'decimal' })
  value!: number;

  @ManyToOne((type) => User, (user) => user.moviment, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  user: User;
}
