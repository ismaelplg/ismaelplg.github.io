import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
