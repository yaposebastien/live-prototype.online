import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Array of products
  products: Product[];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  // Defining method for list of products
  // tslint:disable-next-line: typedef
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
