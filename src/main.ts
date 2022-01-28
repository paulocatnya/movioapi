import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const writeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Rota acessada: --> ${req.url}`);
    console.log(`Metodo: --> ${req.method}`);
    console.log(`header: --> ${JSON.stringify(req.headers)}`);
    console.log(`Response: --> ${res}`);
    next();
  };

  app.use(writeLog);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
