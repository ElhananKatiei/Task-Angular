import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product, ProductAmount, TableInformetion } from '../../model/entityes.type';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from '../../home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError } from 'rxjs';

@Component( {
  selector: 'app-table',
  imports: [ MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
} )
export class TableComponent implements OnInit
{
  productService = inject( ProductsService );//?
  homeComponent = inject( HomeComponent );
  TotalPrice = this.homeComponent.TotalPrice;
  productsAmount = this.homeComponent.productsAmount;

  products = signal<Array<Product>>([]);
  displayedColumns: string[] = [ 'id', 'name', 'price', 'amount' ];

  handleAmount( idProduct: number, event: any )
  {
    const newAmount: number = event.target.value;
    const updateProductAmount = this.productsAmount();
    for ( let item of updateProductAmount ) {
      if ( item.id === idProduct ) {
        item.amount = newAmount;
        break;
      }
    }
    this.productsAmount.set( updateProductAmount );
    this.calculteTotalAmount()
  }

  calculteTotalAmount()
  {
    let totalPrice = 0;
    for ( let item of this.productsAmount() ) {
      totalPrice += item.price * item.amount;
    }
    this.TotalPrice.set( totalPrice );
  }

  ngOnInit(): void
  {
    this.productService.getProducts().pipe(
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    ).subscribe((r)=>{this.products.set(r); 
      const tableInformetion: TableInformetion[] = [];

      for ( let product of r ) {
        tableInformetion.push( { id: product.id, name: product.name, price: product.price, amount: 0 } )
      }
      this.productsAmount.set( tableInformetion );
  });
  }
}
