import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000, horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  create(product: Product): Observable<Product> {
    // funcao para inserir o backend no novo produto
    return this.http.post<Product>(this.baseUrl, product)
    // requisição do tipo post
  }

  read(): Observable<Product[]> {
    // funcao para inserir backend para ler os produtos, por isso cria-se um Array de Product

    return this.http.get<Product[]>(this.baseUrl)

    //retorna um observable, que dentro terá uma lista de produtos
  }


  readById(id: string | null): Observable<Product> {
    // metodo ler por Id
    const url = `${this.baseUrl}/${id}`
    //definida a url - nesse caso, pega a url base 
    //e junta com o id do produto desejado
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    //manda um produto por parametro, e recebe o produto atualizado do backend.
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
    //usa-se put para fazer uma "atualização".
  }

  delete(id: string): Observable<Product> {
    //manda um produto por parametro, para excluir um produto
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url);
    //delete para deletar o produto do backend
  }

}
