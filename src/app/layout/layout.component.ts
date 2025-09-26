import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import HomeComponent from '../modules/home/home.component';
import AboutComponent from '../modules/about/about.component';
('../modules/about/about.component');

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, HomeComponent, AboutComponent],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
