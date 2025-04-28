import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
	constructor(
		@InjectRepository(Book) private readonly bookRepository: Repository<Book>,
		@InjectRepository(Author) private readonly authorRepository: Repository<Author>,
		@InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
	) {}

	async create(createBookDto: CreateBookDto): Promise<Book> {
		const author = await this.authorRepository.findOne({ where: { id: createBookDto.author_id } });
		if (!author) throw new NotFoundException('Author not found');

		const genre = await this.genreRepository.findOne({ where: { id: createBookDto.genre_id } });
		if (!genre) throw new NotFoundException('Genre not found');

		const book = this.bookRepository.create({ ...createBookDto, author, genre });
		return await this.bookRepository.save(book);
	}

	async findAll(): Promise<Book[]> {
		return await this.bookRepository.find({ relations: ['author', 'genre'] });
	}

	findOne(id: number) {
		return `${id}`;
	}

	update(id: number, updateBookDto: UpdateBookDto) {
		return `This action updates a #${id} book`;
	}

	remove(id: number) {
		return `This action removes a #${id} book`;
	}
}
