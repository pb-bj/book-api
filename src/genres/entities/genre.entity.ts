import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	genre_name: string;

	@ManyToMany(() => Book, (books) => books.genre)
	books: Book[];
}
