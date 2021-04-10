import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    //behaviorsubject - classe que sempre que houver uma mudança 
    //vai emitir evento nos dados, ele controla os dados

    title: 'Início',
    icon: 'home',
    routeUrl: ''
  })


  constructor() { }
  
  // dois metodos 
  get headerData(): HeaderData {
    return this._headerData.value
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)

  }


}
