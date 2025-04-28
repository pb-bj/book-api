import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Book, Author, Genre])],
	controllers: [BooksController],
	providers: [BooksService],
})
export class BooksModule {}
