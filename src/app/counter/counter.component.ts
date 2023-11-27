import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() startCount: number = 0;
  @Output() countChange = new EventEmitter<number>();
  count$ = this.counterService.getCount();

  constructor(private counterService: CounterService) {
  }
 
  ngOnChanges(): void {
    // this.counterService.reset(this.startCount);
  }
  onSetCount(value: string) {
    this.counterService.reset(+value);
  }
  onDecrement() {
    this.counterService.decrement();
    // this.countChange.emit(this.count);
  }
  onIncrement() {
    this.counterService.increment();
    // this.countChange.emit(this.count);
  }

}
