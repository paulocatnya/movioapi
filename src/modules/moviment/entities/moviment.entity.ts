import { User } from '../../user/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../comum';

@Entity()
export class Moviment extends AbstractEntity {
  @Column()
  type: string;

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
