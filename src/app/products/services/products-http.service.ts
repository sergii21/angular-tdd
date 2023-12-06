import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  beseUrl = 'http://localhost:3000';
  url = this.beseUrl+'/products';
  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts() {
    return this.httpClient.get<Product[]>(this.url)
  }
}
