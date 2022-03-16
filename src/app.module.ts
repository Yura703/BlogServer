import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NoteModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
