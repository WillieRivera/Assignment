import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  async getPost(@Param() params) {
    return await this.postService.getPost(params.id);
  }

  @Get()
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }
}
