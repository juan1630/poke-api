import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  seedExecuted() {
    return this.seedService.executedSeed();
  }
}
//el controlador solo deberia escuchar peticiones y retornar informacion