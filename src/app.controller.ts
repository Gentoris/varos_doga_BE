import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { get } from 'http';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import Varos from './varos.entity';
import VarosDto from './varosDto.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/varos')
  async getAllVaros(){
    const varosRepo = this.dataSource.getRepository(Varos)
    let varosok = await varosRepo.find()
    return {varosok:varosok}
  }

  @Delete('/varos/:id')
  async deleteVaros(@Param('id') id :number ){
  const varosRepo = this.dataSource.getRepository(Varos)
  varosRepo.delete(id);
  }

  @Post('/varos')
  async postVaros(@Body() varos : VarosDto) {
    const varosRepo = this.dataSource.getRepository(Varos)
    if (!varos.varos){
      throw new BadRequestException('A város mező nem maradhat üresen ')
    }
    if (varos.lakossag < 1){
      throw new BadRequestException('A lakosság nem lehet 0 vagy kisebb ')
    }
    const ujvaros = new Varos()
    ujvaros.varos = varos.varos
    ujvaros.lakossag = varos.lakossag

    varosRepo.save(ujvaros)
  }
}

