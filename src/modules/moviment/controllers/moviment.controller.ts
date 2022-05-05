import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/services';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { MovimentDto } from '../dto';
import { MovimentsService } from '../services/';

@UseGuards(JwtAuthGuard)
@Controller('moviments')
export class MovimentsController {
  constructor(
    private readonly movimentsService: MovimentsService, 
    private readonly authService: AuthService, 
    
  ) { }

  @Get()
  async getMoviments() {
    const moviments = this.movimentsService.findAll();
    return moviments;
  }

  @Post()
  async createMoviment(@Body() dto: MovimentDto, @Req() request) {
    console.log('Chegou aqui --> ', dto)
    const { id } = this.authService.decode(request.headers.authorization)
    return this.movimentsService.create(dto, id);
  }
}
