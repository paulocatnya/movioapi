import { User } from '../../user/entities';
import { TypeMovimentEnum } from '../entities';

export interface MovimentDto {
  id: string;
  type: TypeMovimentEnum;
  description: string;
  user: User;
  value: number;
}
