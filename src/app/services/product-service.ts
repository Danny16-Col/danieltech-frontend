import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';



export interface Product {
  _id?: string;       // MongoDB
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private  apiUrl = 'https://danieltech-backend.onrender.com/api/product';
  private refresh = new Subject<void>();

  constructor(private http: HttpClient) {}

  //refresh
  get refreshProduct(){
    return this.refresh
  }
  notifyRefresh() {
  this.refresh.next();
}

  // GET all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // POST create product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // DELETE product by id
  deleteProduct(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${_id}`);
  }
}
