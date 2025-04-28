import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	isbn: string;

	@IsNumber()
	stock: number;

	@IsNumber()
	price: number;

	@IsString()
	@IsNotEmpty()
	synopsis: string;

	@IsNumber()
	page_count: number;

	@IsNumber()
	weight: number;

	@IsUUID()
	author_id: string;

	@IsArray()
	@IsUUID('all', { each: true })
	genre_ids: string[];
}
