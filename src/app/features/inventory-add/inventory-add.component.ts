import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {

  addNewPostForm = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    status: ['', Validators.required]

  });
  categories: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private dataService: DataService, private bsModalRef: BsModalRef) {

    this.dataService.getInventory().subscribe((data:any) => {
      Object.assign(this.categories, data);
    }, error => { console.log('Error while gettig category data.'); });
  }
  ngOnInit() {

  }
  get f(){
    return this.addNewPostForm.controls;
  }

  onPostFormSubmit(){
    this.dataService.addInventory(this.addNewPostForm.value).subscribe(data=>{
      console.log(data);
      if(data!=null && data!= undefined){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }



}