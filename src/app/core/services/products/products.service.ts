import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProductResponse} from "../../models/products/products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _urlBase: string = 'https://dummyjson.com/products';

  constructor(
    private _http: HttpClient
  ) {
  }

  /**
   * Obtiene una lista de productos de la base de datos.
   *
   * @param {number} limit - El número máximo de productos a obtener.
   * @param {number} skip - El número de productos a omitir en la consulta.
   * @returns {Observable<IProductResponse>} - Un observable que emite la respuesta del servidor.
   * La respuesta es un objeto que implementa la interfaz IProductResponse, que contiene información sobre los productos.
   *
   * @example
   * // Para obtener los primeros 10 productos, omitiendo los primeros 5
   * this.getProducts(10, 5).subscribe(products => console.log(products));
   */
  public getProducts(limit: number, skip: number): Observable<IProductResponse> {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('skip', skip.toString());
    return this._http.get<IProductResponse>(this._urlBase, {params: params});
  }

  /**
   * Busca un producto específico en la base de datos.
   *
   * @param {number} id - El ID del producto que se quiere buscar.
   * @returns {Observable<IProductResponse>} - Un observable que emite la respuesta del servidor.
   * La respuesta es un objeto que implementa la interfaz IProductResponse, que contiene información sobre el producto.
   *
   * @example
   * // Para buscar el producto con el ID 123
   * this.searchProduct(123).subscribe(product => console.log(product));
   */
  public searchProduct(id: number): Observable<IProductResponse> {
    let params = new HttpParams();
    params = params.append('q', id.toString());
    return this._http.get<IProductResponse>(this._urlBase + '/search', {params: params});
  }

}
