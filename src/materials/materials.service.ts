import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from 'src/dto/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(material);
  }

  findByCategory(category: string): Promise<Material[]> {
    return this.materialRepository.find({ where: { category } });
  }

  async addReview(
    id: number,
    review: { value: string; rating: number },
  ): Promise<Material> {
    const material = await this.materialRepository.findOneBy({ id });
    if (!material) {
      throw new Error('Material not found');
    }
    material.reviews.push(review);
    return this.materialRepository.save(material);
  }
}
