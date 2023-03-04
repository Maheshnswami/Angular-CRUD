import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angularcrud_1';
  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price', 'Comment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog,private api:ApiService){


  }
  ngOnInit(): void {
    this.getAllproduct();
  }
  openDialog() {
     this.dialog.open(DailogComponent,{
      width:'30%'

    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllproduct();
      }
    })
}
getAllproduct(){
  this.api.getProduct()
  .subscribe({
    next:(res)=>{
this.dataSource= new MatTableDataSource(res);
this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.sort;
 },
    error:(err)=>{
      alert("Error while fetching data");

    }

  })

}
editProduct(row:any){
this.dialog.open(DailogComponent ,{
  width :'30%',
  data : row
}).afterClosed().subscribe(val=>{
  if(val==='update'){
    this.getAllproduct();
  }
})

}

deleteProduct(id:number){
  this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("Product Deleted Succesfully");
      this.getAllproduct();
    },
    error:()=>{
   alert("Error While Deleting The Record !!");
    }
  })

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
