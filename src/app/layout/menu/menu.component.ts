import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {menuItems} from "./menu";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: {
    icon: string;
    link: string; label: string }[] = menuItems;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isOpenMenu = true;

  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    if (this.isOpenMenu) {
      this.sidenav?.close();
    } else {
      this.sidenav?.open()
    }
  }

  closeMenu(){
    this.isOpenMenu = false;
    this.toggleMenu();
  }
}
