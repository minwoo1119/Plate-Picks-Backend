import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';

export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async getFoods(): Promise<Food[]> {
    return this.foodRepository.find();
  }
}
