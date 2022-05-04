import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { MovimentDto } from '../dto';
import { MovimentsService } from '../services/';

@UseGuards(JwtAuthGuard)
@Controller('moviments')
export class MovimentsController {
  constructor(private readonly movimentsService: MovimentsService) {}

  @Get()
  async getMoviments() {
    const moviments = this.movimentsService.findAll();
    return moviments;
  }

  @Post()
  createMoviment(@Body() dto: MovimentDto) {
    console.log('Chegou: ', dto)
    return this.movimentsService.create(dto);
  }
}
