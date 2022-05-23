import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from "./track/track.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [AuthModule, TrackModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
