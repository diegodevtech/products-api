import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug can only contain lowercase letters, numbers and dashes',
  })
  @IsNotEmpty()
  slug: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(1)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
}
