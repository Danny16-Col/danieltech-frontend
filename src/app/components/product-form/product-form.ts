import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductForm {
  productForm: FormGroup;
  loading = false;
  error = '';
  message = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      imageUrl: [''],
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.error = 'Por favor ingrese todos los datos';
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    const product: Product = this.productForm.value;

    this.productService.createProduct(product).subscribe({
      next: (createdProduct) => {
        this.loading = false;
        this.message = 'Producto creado correctamente';
        this.productService.notifyRefresh();
        this.productForm.reset();
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al conectar con el servidor';
        console.error(err);
        setTimeout(() => {
          this.error = '';
        }, 3000);
      },
    });
  }
}
