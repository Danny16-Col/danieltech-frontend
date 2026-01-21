import { Component, OnInit } from '@angular/core';
import { ProductForm } from "../product-form/product-form";
import { Product, ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [ProductForm, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{

  product: Product[]=[];
  loading = false;
  error = '';
  constructor(private productService:ProductService ){}

  ngOnInit(): void {
    this.getServices();
  }

  getServices():void{
    this.loading = true;
    this.productService.getProducts().subscribe({
      next:(data)=>{
        this.product = data;
        this.loading = false
      },
      error:(err)=>{
        this.error = 'Error al cargar los productos'
        console.error(err);
        this.loading = false
        
      }

    })
  }

}
