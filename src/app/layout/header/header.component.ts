import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() displayMenu = new EventEmitter<string>();

  clickDisplayMenu(){
    this.displayMenu.emit('completed');
  }
}
