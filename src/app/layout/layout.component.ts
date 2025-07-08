import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidepanelComponent } from '../shared/components/sidepanel/sidepanel.component';
import { slideInAnimation } from '../shared/animations/animations';
import { ContainerComponent } from '../shared/components/container/container.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidepanelComponent],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {}
