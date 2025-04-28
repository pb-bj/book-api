import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	name: string;

	@Column()
	bio: string;

	@OneToMany(() => Book, (books) => books.author, { cascade: true })
	books: Book[];
}
