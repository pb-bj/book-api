import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column()
	isbn: string;

	@Column({ default: 0 })
	stock: number;

	@Column()
	price: number;

	@Column({ type: 'text', nullable: true })
	synopsis: string;

	@Column()
	page_count: number;

	@Column()
	weight: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@ManyToOne(() => Author, (author) => author.books)
	@JoinColumn({ name: 'author_id' })
	author: Author;

	@ManyToOne(() => Genre, (genre) => genre.books)
	@JoinColumn({ name: 'genre_id' })
	genre: Genre;
}
