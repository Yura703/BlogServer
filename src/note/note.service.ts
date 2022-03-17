import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import * as fs from 'fs';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, file: Express.Multer.File) {
    const note = new Note(
      createNoteDto.name,
      createNoteDto.message,
      file.filename,
      file.originalname,
    );

    return await this.noteRepository.save(note);
  }

  async findOne(id: string) {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new HttpException('File not found!', HttpStatus.NOT_FOUND);
    }

    const filePath = join(process.cwd(), `/uploads/${note.fileId}`);

    if (existsSync(filePath)) {
      const stream = createReadStream(filePath);
      return new StreamableFile(stream);
    }
    throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    file: Express.Multer.File,
  ) {
    const note = await this.checkId(id);
    if (file) {
      const fileForDelete = note.fileId;
      await this.removeFile(fileForDelete);
      note.fileId = file.originalname;
      note.fileName = file.filename;
    }
    note.message = updateNoteDto.message;

    const data = await this.noteRepository.save(note);
    return data;
  }

  async remove(id: string) {
    const delNote = await this.checkId(id);
    await this.removeFile(delNote.fileId);

    return this.noteRepository.remove(delNote);
  }

  async removeFile(fileId: string) {
    const filepath = join(process.cwd(), `/uploads/${fileId}`);

    if (!existsSync(filepath)) {
      throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
    }
    fs.unlink(filepath, (err) => {
      if (err) throw new HttpException('File not found!', HttpStatus.NOT_FOUND);
    });
  }

  async checkId(id: string) {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new HttpException('ID not found!', HttpStatus.NOT_FOUND);
    }

    return note;
  }
}
