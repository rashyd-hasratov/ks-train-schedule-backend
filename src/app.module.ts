import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PlaceModule } from './place/place.module';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      uri: process.env.DB_URI,
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ScheduleModule,
    PlaceModule,
    TrainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
