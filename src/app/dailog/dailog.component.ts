import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {

  freshnessList=['Brand New','Secound Hand','Refurnished'];
  productForm !:FormGroup;
  actionbtn :string="Save"
 constructor( private formBuilder : FormBuilder, private api : ApiService,
 @Inject(MAT_DIALOG_DATA) public editData:any,
  private dailogref: MatDialogRef<DailogComponent> ){

 }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      Comment : ['', Validators.required],
      date : ['', Validators.required]
    });
    if(this.editData){
      this.actionbtn="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }
addproduct(){
if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value).subscribe({ next :(res) =>{
      alert("Product Added Succesfully");
      this.productForm.reset();
      this.dailogref.close('save');
    },
  error:()=>{
    alert("Error While Adding Product");

  }
  })
  }
}else{
  this.updateProduct();
}

}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
    next:(res)=>{
      alert("Product Updated Succesfully");
      this.productForm.reset();
      this.dailogref.close('update');
    },
    error:()=>{
      alert("Error While Updating The Data !!");
    }
  })
}

}
