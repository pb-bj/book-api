import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
	constructor(@InjectRepository(Genre) private readonly genreRepository: Repository<Genre>) {}

	async create(createGenreDto: CreateGenreDto): Promise<Genre> {
		let genre = this.genreRepository.create(createGenreDto);
		return await this.genreRepository.save(genre);
	}

	async findAll(): Promise<Genre[]> {
		return await this.genreRepository.find();
	}

	async findOne(id: string): Promise<Genre | null> {
		return this.genreRepository.findOne({ where: { id } });
	}

	async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
		let genre = await this.genreRepository.findOneBy({ id });
		if (!genre) {
			throw new NotFoundException(`Genre with id: ${id} not found`);
		}

		let updateGenre = this.genreRepository.merge(genre, updateGenreDto);
		return this.genreRepository.save(updateGenre);
	}

	async remove(id: string) {
		return await this.genreRepository.delete(id);
	}
}
