import { Moviment } from '../../moviment/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../comum/';
@Entity()
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  password: string;

  @OneToMany((type) => Moviment, (moviment) => moviment.user, {
    nullable: true,
    lazy: true,
  })
  moviment: Moviment;
}
