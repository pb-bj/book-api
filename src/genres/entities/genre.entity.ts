import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	genre_name: string;

	@OneToMany(() => Book, (books) => books.genre)
	books: Book[];
}
