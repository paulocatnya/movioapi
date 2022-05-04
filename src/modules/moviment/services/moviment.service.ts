import { Injectable } from '@nestjs/common';
import { MovimentsRepository } from '../repositories';

@Injectable()
export class MovimentsService {
  constructor(private movimentsRepository: MovimentsRepository) {}

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

  async create(dto: any) {
    dto.user_id = "717388a2-defc-47b4-8dee-0791ba1601e5"
    console.log('ADICIONANDO USER_ID:', dto.user_id)
    return await this.movimentsRepository.save(dto);
  }
}
