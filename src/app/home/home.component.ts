import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../services/products.service';
import { TableComponent } from '../components/table/table.component';
import { JobSite, NewOrder, Order, Product, ProductAmount, TableInformetion } from '../model/entityes.type';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BACK_END_URL } from '../../../environment';


@Component( {
  selector: 'app-home',
  imports: [ MatFormFieldModule, MatInputModule, MatSelectModule, TableComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
} )
export class HomeComponent 
{
  http = inject( HttpClient );
  loginService = inject( LoginService );
  manager = signal( this.loginService.Manager );
  TotalPrice = signal( 0 );
  jobSiteId = signal<number>( 0 );
  productsAmount = signal<TableInformetion[]>( [] );

  protected onInput( event: number )
  {
    this.jobSiteId.set( event );
  }

  handleSubmit()
  {
    if ( this.checkFildes() ) {
      const url = BACK_END_URL + '/Order';
      let newOrder: Order = {} as Order;
      newOrder = this.preperNewOrder( newOrder );
      console.log( 'this is the new order : ', newOrder );
      this.http.post( url, { IdManager: this.manager()?.id, Order: newOrder } as NewOrder )
        .subscribe( ( r ) =>
        {
          console.log( "this is the result!!", r )
        } );
      this.reset();
    }

  }

  reset()
  {
    this.TotalPrice.set( 0 );
    this.productsAmount().forEach( ( p ) => { if ( p.amount > 0 ) p.amount = 0 } )
  }

  checkFildes(): boolean
  {
    return this.jobSiteId() !== 0 && this.TotalPrice() !== 0;
  }

  preperNewOrder( newOrder: Order ): Order
  {
    newOrder.jobSite = this.manager()?.jobSites.find( ( j ) => j.id == this.jobSiteId() )!
    newOrder.totalPrice = this.TotalPrice();
    newOrder.productAmount = {} as ProductAmount;
    for ( let item of this.productsAmount() ) {
      if ( item.amount > 0 ) {
        newOrder.productAmount.amount = item.amount;
        newOrder.productAmount.product = { id: item.id, name: item.name, price: item.price };
      }
    }
    return newOrder
  }

}
