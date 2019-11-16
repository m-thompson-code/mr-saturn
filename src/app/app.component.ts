import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mr-saturn';
  constructor() {
    (window as any).dark = () => {
      if (localStorage.getItem('dark')) {
        localStorage.setItem('dark', 'true');
      } else {
        localStorage.setItem('dark', '');
      }
    }
  }
}
