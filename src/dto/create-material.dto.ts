export class CreateMaterialDto {
  category: string;
  numberOfPages: number;
  department: string;
  level: string;
  title: string;
  description: string;
  price: number;
  url: string;
  cover_url: string;
  reviews?: { value: string; rating: number }[];
}
