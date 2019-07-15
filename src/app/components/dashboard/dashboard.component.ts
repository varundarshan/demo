import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  closeResult: string;
  expenseForm: FormGroup;
  arr = [];
  val: any;
  index = -1;
  category;
  expenseAmount = 0;
  category_name = [];
  count;
  totalAmount = 0;
  percent = 0;
  result = [];

  dataSource;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.arr = [];
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      item_name: ['', Validators.required],
      amount: ['', Validators.required],
      expense_date: ['', Validators.required],
      status: ['active']
    })
    console.log("ngOnInit")
    this.val = JSON.parse(localStorage.getItem('expense'));
    if(this.val!=null){
    this.expenseAmount = this.val.reduce((total, obj) => obj.amount + total, 0);
    
    this.result = this.val.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));
    }
    this.totalAmount = JSON.parse(localStorage.getItem('budget'));
    this.category = JSON.parse(localStorage.getItem('category'));
    console.log(this.category);
    this.percent = (this.expenseAmount / this.totalAmount) * 100;
    console.log(this.percent);
    
    for (var i = 0; i < Object.keys(this.result).length; i++) {
      this.arr.push({
        label: Object.keys(this.result)[i],
        value: Object.values(this.result)[i].length.toString()
      })
    }
    this.dataSource = {
      "chart": {
        "caption": "Category Wise Expense Pie Chart",
        "showValues": "1",
        "showPercentInTooltip": "0",
        "enableMultiSlicing": "1",
        "theme": "fusion"
      },
      "data": this.arr
    }
   

  }

  edit(val, index) {
    this.index = index;
    this.expenseForm.setValue({
      category: this.val[index].category,
      item_name: this.val[index].item_name,
      amount: this.val[index].amount,
      expense_date: this.val[index].expense_date,
      status: 'active'
    })
  }

  close() {
    this.index = -1;
  }

  editExpense() {
    // this.val.splice(this.index, 1);
    this.val[this.index] = this.expenseForm.value;
    localStorage.setItem('expense', JSON.stringify(this.val));
    this.ngOnInit();
  }

  open(content) {
    if(localStorage.getItem('category')==null){
      alert('Please add atleast one category')
    }else{
    console.log(content);
    this.modalService.open(content, { backdrop: 'static' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  delete(val, index) {
    this.val[index].status = 'inactive';
    console.log(this.val);
    localStorage.setItem('expense', JSON.stringify(this.val));
    this.ngOnInit();
  }

  undo(val, index) {
    this.val[index].status = 'active';
    console.log(this.val);
    localStorage.setItem('expense', JSON.stringify(this.val));
    this.ngOnInit();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveExpense() {
    console.log(this.expenseForm.value);
    if (localStorage.getItem('expense') == null) {
      localStorage.setItem('expense', JSON.stringify([this.expenseForm.value]));
      this.ngOnInit();
    } else {
      this.arr = JSON.parse(localStorage.getItem('expense'));
      this.arr.push(this.expenseForm.value);
      localStorage.setItem('expense', JSON.stringify(this.arr));
      this.ngOnInit();
    }

  }

}
