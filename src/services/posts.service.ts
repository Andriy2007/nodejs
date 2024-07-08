import { ApiError } from "../errors/api-error";
import { IPost } from "../interfaces/post.interface";
import { postRepository } from "../repositories/post.repository";


class PostsService {
    public async getList(): Promise<IPost[]> {
        return await postRepository.getList();
    }
    public async getById(postId: string): Promise<IPost> {
        return await this.findPostOrThrow(postId);
    }
    public async getAveragePriceByRegion(manufacture: string, city?: string,): Promise<number> {
        return await postRepository.getAveragePriceByRegion(manufacture, city);
    }
    public async getFindCountPostById(userId: string): Promise<number> {
        return await postRepository.getFindCountPostById(userId);
    }

    public async create(dto: Partial<IPost>): Promise<IPost> {
        return await postRepository.create(dto);
    }
    public async updateById(postId: string, dto: Partial<IPost>): Promise<IPost> {
        await this.findPostOrThrow(postId);
        return await postRepository.updateById(postId, dto);
    }
    public async deleteById(postId: string): Promise<void> {
        await this.findPostOrThrow(postId);
        return await postRepository.deleteById(postId);
    }
    private async findPostOrThrow(postId: string): Promise<IPost> {
        const post = await postRepository.getByPostId(postId);
        if (!post) {
            throw new ApiError("post not found", 404);
        }
        return post;
    }
}

export const postService = new PostsService();