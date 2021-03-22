import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-main',
  templateUrl: './spinner-main.component.html',
  styleUrls: ['./spinner-main.component.css']
})
export class SpinnerMainComponent implements OnInit {

  @Input() message = '';
  constructor() { }

  ngOnInit(): void {
  }

}
