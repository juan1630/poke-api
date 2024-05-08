import { Injectable } from '@nestjs/common';
import  axios, { Axios, AxiosInstance }  from 'axios';
import { PokemonResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  async executedSeed(){
    const { data } = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    data.results.forEach( function( {name, url} ){
      const splits =  url.split('/');
      const no:number = +splits[ splits.length - 2 ];

      console.log({name, no})
    })

    return data.results;
  }
}
