import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { v4 as uuid } from 'uuid';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Note } from './entities/note.entity';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({ summary: 'Create the Note' })
  @ApiResponse({ status: 200, description: 'Note created' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) =>
          cb(null, uuid() + extname(file.originalname)),
      }),
    }),
  )
  @HttpCode(HttpStatus.OK)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.noteService.create(createNoteDto, file);
  }

  @ApiOperation({ summary: 'Download file and message' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @ApiOperation({ summary: 'Update file and message' })
  @ApiResponse({ status: 200, type: Note })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) =>
          cb(null, uuid() + extname(file.originalname)),
      }),
    }),
  )
  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.noteService.update(id, updateNoteDto, file);
  }

  @ApiOperation({ summary: 'Delete file and message' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
