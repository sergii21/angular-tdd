import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
homes$:any;

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.homes$=of([
    {
      title: 'Home 1'
    },
    {
      title: 'Home 1'
    },
    {
      title: 'Home 1'
    },
  ])
}
}
