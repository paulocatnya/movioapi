import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/user/services';
import { MovimentsRepository } from '../repositories';

@Injectable()
export class MovimentsService {
  constructor(
    private movimentsRepository: MovimentsRepository,

    private usersService: UsersService) { }

  async findAll() {
    const [moviments, totalItems] = await this.movimentsRepository.findAndCount(
      { order: { updatedAt: 'ASC' } },
    );

    const objRetorno = {
      moviments: moviments,
      totalDeposit: 0,
      totalWithdraw: 0,
      balance: 0,
      totalItems,
    };

    moviments.reduce((_, currentValue) => {
      if (currentValue.type === "DEPOSIT") {
        objRetorno.totalDeposit += Number(currentValue.value);
        return (objRetorno.balance += Number(currentValue.value));
      }

      if (currentValue.type === "WITHDRAW") {
        objRetorno.totalWithdraw += Number(currentValue.value);
        return (objRetorno.balance -= Number(currentValue.value));
      }
    }, 0);

    return objRetorno;
  }

  async getOne(id: string) {
    return await this.movimentsRepository.findOne(id);
  }

  async create(dto: any, idUser: string) {
    dto.user = await this.usersService.findOne(idUser)

    if (!idUser || !dto.user) {
      throw new HttpException(
        'Não foi possível identificar o usuário logado, por favor, efetue login novamente. ',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.movimentsRepository.insert(dto);
  }
}
