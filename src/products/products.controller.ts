import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: Partial<Product>): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:id')
  async addFavorite(@Request() req, @Param('id') productId: string) {
    return this.usersService.addFavoriteProduct(req.user.userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfavorite/:id')
  async removeFavorite(@Request() req, @Param('id') productId: string) {
    return this.usersService.removeFavoriteProduct(req.user.userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    return user.favoriteProducts;
  }
}