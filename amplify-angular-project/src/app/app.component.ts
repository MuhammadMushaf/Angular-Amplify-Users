import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-angular-project';

  listArr  : string[]= [];
  inputTxt = '';

  addToList(){
    if(this.inputTxt != ''){
      this.listArr.push(this.inputTxt);
    }
  }
  removeItem(index : number){
    this.listArr.splice(index,1);
  }
}
