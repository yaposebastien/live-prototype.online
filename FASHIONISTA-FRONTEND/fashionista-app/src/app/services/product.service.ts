import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // API URL for Products
  private productUrl = 'http://localhost:5000/api/v1/products';

  constructor(private httpClient: HttpClient) { }


  // Module to retrieve list of product
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.productUrl).pipe(
      map(response => response.products)
    );
  }
}

// Interface to unwrap the JSON from NodeJS Data Rest API
interface GetResponse {
    products: Product[];
}
