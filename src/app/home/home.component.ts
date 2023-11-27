import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  homes$:any;
  constructor(
    private dataService: DataServiceService
  ) {

    this.homes$=this.dataService.getHomes$();
  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.homes$=of([
  //   {
  //     title: 'Home 1'
  //   },
  //   {
  //     title: 'Home 1'
  //   },
  //   {
  //     title: 'Home 1'
  //   },
  // ])
}
}
