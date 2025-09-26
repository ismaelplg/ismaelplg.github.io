import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
