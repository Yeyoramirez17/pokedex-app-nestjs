import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/paginatio.dto';

@Controller('pokemon')
export class PokemonController {
  
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode( HttpStatus.OK ) /* PERSONALIZAR CODIGOS DE RESPUESTA */
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':field')
  findOne(@Param('field') field: string) {
    return this.pokemonService.findOne( field );
  }

  @Patch(':field')
  update(@Param('field') field: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update( field, updatePokemonDto );
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove( id );
  }
}
