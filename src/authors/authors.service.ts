import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
	constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {}

	async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
		let author = this.authorRepository.create(createAuthorDto);
		return await this.authorRepository.save(author);
	}

	async findAll(): Promise<Author[]> {
		return await this.authorRepository.find();
	}

	async findOne(id: string): Promise<Author> {
		const author = await this.authorRepository.findOne({ where: { id }, relations: ['books'] });
		if (!author) throw new NotFoundException('Author not found');
		return author;
	}

	async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
		const author = await this.authorRepository.findOne({ where: { id } });
		if (!author) throw new NotFoundException('Author not found');

		const updatedAuthor = this.authorRepository.merge(author, updateAuthorDto);
		return updatedAuthor;
	}

	async remove(id: string): Promise<void> {
		const result = await this.authorRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException('author not found');
		}
	}
}
