import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user;
  newItem: FormControl;
  editedItem: FormControl;
  editedItemIndex: number = -1;
  constructor(private authService: AuthService, private listService: TodoListService) { }

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe( user => {
      this.user= user;
      console.log(this.user);
    });

    this.newItem = new FormControl(null, Validators.required);
  }

  enterNewItem() {
    if (this.newItem.invalid) {
      return null;
    }
    this.listService.addToList(this.newItem.value);
    this.newItem.reset();
  }
  removeFromList(listId: string) {
    this.listService.removeFromList(listId);
  }

  enableEdittion(listId:string) {
    this.editedItemIndex = this.user.todoLists.findIndex( list => {
      return list._id === listId;
    })
    let editedItemTitle = this.user.todoLists[this.editedItemIndex].title;
    this.editedItem = new FormControl( editedItemTitle , Validators.required);
  }

  editItem(itemIndex: number) {
    if (this.editedItem.invalid) {
      return null;
    }
    const itemId = this.user.todoLists[itemIndex]._id;
    this.listService.editItem(itemId, this.editedItem.value);
    this.editedItem.reset();
    this.editedItemIndex = -1;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
