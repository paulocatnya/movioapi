import { EntityRepository, Repository } from 'typeorm';
import { Moviment } from '../entities';

@EntityRepository(Moviment)
export class MovimentsRepository extends Repository<Moviment> {}
