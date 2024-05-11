import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private http:AxiosAdapter
  ) {}

  async executedSeed() {

    const pokemonToInsert: { name: string, no:number }[] = [];

    await this.pokemonModel.deleteMany({}); //delete * from

    const { results } = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=150',
    );
    

    results.forEach(({ name, url }) => {
      const splits = url.split('/');

      const no: number = +splits[splits.length - 2];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed executed';
  }
}
