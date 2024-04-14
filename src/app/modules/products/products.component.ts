import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../core/services/products/products.service";
import {Subscription} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {IProduct} from "../../core/models/products/products.model";
import {BlockPageComponent} from "../../core/ui/block-page/block-page.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, BlockPageComponent, ReactiveFormsModule, NgForOf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent implements OnDestroy, OnInit {

  private _subscriptions: Subscription = new Subscription();
  private limit: number = 30;
  private skip: number = 0;

  protected products: IProduct[] = [];
  protected isLoading: boolean = false;
  protected searchForm: FormControl = new FormControl('', Validators.required);
  protected currentPage: number = 1;
  protected totalProducts: number = 0;
  protected totalPages: number = 0;

  constructor(
    private _productsService: ProductsService
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private getProducts(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._productsService.getProducts(this.limit, this.skip).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (!response) {
            alert('No se encontraron productos');
            return;
          }

          this.products = response.products;
          this.totalProducts = response.total;
          this.skip = response.skip;
          this.generatePagination();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error:', error);
          alert('Ocurrió un error al obtener los productos');
        }
      })
    );
  }

  protected searchProduct(): void {
    if (this.searchForm.invalid) {
      this.currentPage = 1;
      this.skip = 0;
      this.getProducts();
      return;
    }

    this.currentPage = 1;
    this.isLoading = true;
    this._subscriptions.add(
      this._productsService.searchProduct(this.searchForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (!response) {
            alert('No se encontraron productos');
            return;
          }

          this.products = response.products;
          this.totalProducts = response.total;
          this.skip = response.skip;
          this.generatePagination();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error:', error);
          alert('Ocurrió un error al obtener los productos');
        }
      })
    );
  }

  private generatePagination(): void {
    this.totalPages = Math.ceil(this.totalProducts / this.limit);
  }


  protected nextPage(): void {
    this.currentPage++;
    this.skip = this.limit + this.skip;
    this.getProducts();
  }

  protected previousPage(): void {
    this.currentPage--;
    this.skip = this.skip - this.limit;
    this.getProducts();
  }

}
