import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000, horizontalPosition: "right",
      verticalPosition: "top",
      //se a mensagem for error, se não, success
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    // funcao para inserir o backend no novo produto
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj), 
      //recebo um objeto e estou retorno o mesmo
      catchError(e => this.errorHandler(e))
      //mas caso ocorra um erro na chamada do "post", ele cai no catcherror chamando a funcao
    
      
    );
    // requisição do tipo post
  }


  read(): Observable<Product[]> {
    // funcao para inserir backend para ler os produtos, por isso cria-se um Array de Product

    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj), 
      //recebo um objeto e estou retorno o mesmo
      catchError(e => this.errorHandler(e))
      //mas caso ocorra um erro na chamada do "post", ele cai no catcherror chamando a funcao
    
      
    );

    //retorna um observable, que dentro terá uma lista de produtos
  }


  readById(id: string | null): Observable<Product> {
    // metodo ler por Id
    const url = `${this.baseUrl}/${id}`
    //definida a url - nesse caso, pega a url base 
    //e junta com o id do produto desejado
    return this.http.get<Product>(url).pipe(
      map(obj => obj), 
      //recebo um objeto e estou retorno o mesmo
      catchError(e => this.errorHandler(e))
      //mas caso ocorra um erro na chamada do "post", ele cai no catcherror chamando a funcao
    
      
    );
  }

  update(product: Product): Observable<Product> {
    //manda um produto por parametro, e recebe o produto atualizado do backend.
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj), 
      //recebo um objeto e estou retorno o mesmo
      catchError(e => this.errorHandler(e))
      //mas caso ocorra um erro na chamada do "post", ele cai no catcherror chamando a funcao
    
      
    );
    //usa-se put para fazer uma "atualização".
  }

  delete(id: number | undefined): Observable<Product> {
    //manda um produto por parametro, para excluir um produto
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj), 
      //recebo um objeto e estou retorno o mesmo
      catchError(e => this.errorHandler(e))
      //mas caso ocorra um erro na chamada do "post", ele cai no catcherror chamando a funcao
    
      
    );
    //delete para deletar o produto do backend
  }

  errorHandler(e: any): Observable<any> {
    //console log = mostrar mensagem no console do navegador
    console.log(e)
    this.showMessage('Ocorreu um erro!', true);
    //caso de um erro, mostra mensagem
      return EMPTY
      //retorna um observable vazio 
  }

}
