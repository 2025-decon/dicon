import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AutoEntity } from './entities/auto.entity';
import { CreateAutoDto } from './dto/create-auto.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';

@Injectable()
export class AutoService {
  constructor(
    @InjectRepository(AutoEntity)
    private readonly repo: Repository<AutoEntity>,
  ) {}

  async create(dto: CreateAutoDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Auto not found');
    return item;
  }

  async update(id: number, dto: UpdateAutoDto) {
    const result = await this.repo.update(id, dto);
    if (result.affected === 0) throw new NotFoundException('Auto not found');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Auto not found');
    return { ok: true };
  }
}