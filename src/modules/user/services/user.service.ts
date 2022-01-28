import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from '../../../comum';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(dto: UserDto) {
    const userExist = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (userExist) {
      throw new HttpException(
        'Endereço de email indisponível',
        HttpStatus.BAD_REQUEST,
      );
    }

    dto.password = UtilsService.generateHash(dto.password);

    const userEntity = await this.usersRepository.save(dto);
    userEntity.password = undefined;

    return userEntity;
  }

  async update(dto: UserDto, id: string) {
    const userExist = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.update(id, dto);
  }

  async delete(id: string) {
    const userExist = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.delete(id);
  }
}
