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
		const { author_id, genre_ids, ...bookData } = createBookDto;

		const author = await this.authorRepository.findOne({ where: { id: author_id } });
		if (!author) throw new NotFoundException('Author not found');

		const genre = await this.genreRepository.find({
			where: genre_ids.map((id) => ({ id })),
		});
		if (!genre.length) throw new NotFoundException('No genre found');

		const book = this.bookRepository.create({ ...bookData, author, genre });
		return await this.bookRepository.save(book);
	}

	async findAll(): Promise<Book[]> {
		return await this.bookRepository.find({ relations: ['author', 'genre'] });
	}

	async findOne(id: string): Promise<Book | null> {
		return await this.bookRepository.findOne({ where: { id } });
	}

	async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
		const book = await this.bookRepository.findOne({ where: { id } });
		if (!book) throw new NotFoundException('Book id not matched or found');

		const updatedBook = this.bookRepository.merge(book, updateBookDto);
		return updatedBook;
	}

	async remove(id: string) {
		const deletedBook = await this.bookRepository.delete(id);
		if (deletedBook) {
			return `${id} deleted`;
		}
	}
}
