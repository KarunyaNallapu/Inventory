import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inventory-delete',
  templateUrl: './inventory-delete.component.html',
  styleUrls: ['./inventory-delete.component.scss']
})
export class InventoryDeleteComponent implements OnInit {
  postId: any;
  title: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private dataService: DataService) {
    this.dataService.inventoryIdData.subscribe((user: any) => this.postId = user);
    console.log(this.postId)
  }
  ngOnInit() {

  }

  deletePost(postId: number) {
    this.dataService.deleteInventory(postId).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();

  }



}
