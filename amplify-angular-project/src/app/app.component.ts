import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users : any[]=[];
  title = 'amplify-angular-project';
  listArr  : string[]= [];
  name = '';
  email = '';
  tenantId='';
  deleteUserMessage = '';
  successMessage = '';
  constructor(private userService : UsersService){}

  ngOnInit(): void {
    this.listUsers();
  }


  private listUsers() {
    this.userService.listUsers().subscribe(data => {
      this.users = data?.data?.listUsers?.items;
      console.log(data);
    });
  }

  addToList(){
    // if(this.inputTxt != ''){
    //   this.listArr.push(this.inputTxt);
    // }
    if(this.name != '' && this.email != '' && this.tenantId != ''){
      this.userService.addUser(this.name,this.email,this.tenantId).subscribe(data =>{
        console.log("user added successfully", data);
        this.successMessage="User Added Successfully";
      })
      setTimeout(() => {
        this.successMessage="";
      }, 3000);
    }
    this.listUsers();
  }
  removeItem(id : string){

    this.userService.deleteUser(id).subscribe(data => {
      console.log("User Deleted Succesfully",data)
      this.deleteUserMessage="User Deleted Succesfully";
    })
    this.listUsers();
    setTimeout(() => {
      this.deleteUserMessage="";
    }, 3000);
    
  }
}
