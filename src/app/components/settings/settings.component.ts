import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  list = [];
  budget;
  category = '';
  constructor() { }

  ngOnInit() {
    this.category = '';
    if(localStorage.getItem('budget')!=null){
      this.budget = JSON.parse(localStorage.getItem('budget'));
    }
    this.list = JSON.parse(localStorage.getItem('category'));
  }

  saveCategory(category){
    console.log(category);
    if(localStorage.getItem('category')==null){
      localStorage.setItem('category',JSON.stringify([category]));
      this.ngOnInit();
    }else{
      this.list = JSON.parse(localStorage.getItem('category'));
      this.list.push(category);
      localStorage.setItem('category',JSON.stringify(this.list));
      this.ngOnInit();
    }
  }

  update(val){
    localStorage.setItem('budget',JSON.stringify(val));
  }

}
