import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    //console.log(createNoteDto);
    console.log(file);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: string) {
    return this.noteRepository.findOne(id);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: string) {
    const delNote = await this.noteRepository.findOne(id);
    if (!delNote) {
      return false;
    }
    return this.noteRepository.remove(delNote);
  }
}
