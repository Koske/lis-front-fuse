import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataService } from '../service/data.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  pages: any[] = [];
  ind: number = -1;
  totalPages: any;
  searchPages: any;
  userId: number = -1;
  again: boolean = true;
  displayedColumns = ['first_name', 'last_name', 'email', 'user_type', 'position', 'team'];
  total: number = 0;
  currentPage: number = 1;
  searchTerm: string;
  constructor(private userService: UserService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.getAllUsers(1);

    this.dataService.currentMessage.subscribe(message => {
      this.searchTerm = message;
      console.log(this.searchTerm);
      if(this.searchTerm!= ''){
        this.search(1, this.searchTerm);
      }else{
        this.getAllUsers(1);
      }

    });

  }

  newPage(page){
    if(this.userId!= -1){
      let id2 = this.userId.toString();
      let table = document.getElementById(id2);
      table.classList.toggle("active");
      this.userId = -1;
    }
      this.getAllUsers(page);

  }

  getAllUsers(page){
    this.userService.getUsers(this.users, page, 5).subscribe((response: any) => {
       this.pages = [];
       this.users = response.users;
       console.log(response);
       this.totalPages = response;
       this.total = response.total_pages;
       this.currentPage = page;
       if(page == 1){
         for(let i = 1; i <= response.total_pages; i++){
           if(i>3){
             break;
           }
           this.pages.push(i);
         }
       }else{
         if(page == this.total && page-2!=0)
           this.pages.push(page-2);
         this.pages.push(page-1);
         this.pages.push(page);
         if(this.total > page)
           this.pages.push(page+1);
       }
       this.totalPages.total_pages = this.pages;


    });
  }

  search(page, searchTerm){
    this.userService.getSearch(this.users, page, 5, searchTerm).subscribe((response: any) => {
      this.searchPages = response;
      this.pages = [];
       this.total = response.total_pages;

       if(page == 1){
         for(let i = 1; i <= response.total_pages; i++){
           if(i>3){
             break;
           }
           this.pages.push(i);
         }
       }else{
         if(page == this.total && page-2!=0)
           this.pages.push(page-2);
         this.pages.push(page-1);
         this.pages.push(page);
         if(this.total > page)
           this.pages.push(page+1);
       }

      this.searchPages.total_pages = this.pages;
      this.users = response.users;
    });
  }


  onDelete() {
    if(this.userId != -1){
      if(confirm("Are you sure to delete ")) {
        this.userService.deleteUser(this.userId);
        this.userId = -1;

        setTimeout( () => {
            this.getAllUsers(this.currentPage);
            console.log("I got executed!");
        },1000);
        

    }
  }
}


  onDetails(){
    if(this.userId != -1){
     this.router.navigate(['/report', this.userId]);
   }
  }

  stashInfo(userId, ind){
    if(this.userId == userId){
      this.userId = -1;
      this.ind = -1;
      let table = document.getElementById(userId);
      table.classList.toggle("active");
    }
    else if(this.userId!= -1){
      let id = this.userId.toString();
      let table = document.getElementById(id);
      table.classList.toggle("active");
      this.ind = ind;
      this.userId = userId;
      let id2 = this.userId.toString();
      table = document.getElementById(id2);
      table.classList.toggle("active");
    }
    else{
      this.userId = userId;
      this.ind = ind;
      let table = document.getElementById(userId);
      table.classList.toggle("active");
    }
 
    console.log(this.userId, this.ind);
  }

  onEdit(){
    if(this.userId != -1){
      this.router.navigate(['/edit-user', this.userId]);
    }
  }

  lastPage(){
    this.getAllUsers(this.total);
  }

  onEditedPresence(){
    if(this.userId != -1){
      this.router.navigate(['/edit-presence-report', this.userId]);
    }  
  }

}
