import { User } from '../../user/entities';

export interface MovimentDto {
  id: string;
  type: string;
  description: string;
  user: User;
  value: number;
}
