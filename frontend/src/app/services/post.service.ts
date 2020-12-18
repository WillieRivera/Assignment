import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API_ENDPOINT = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getPostById(id: Number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/posts/${id}`);
  }
}
