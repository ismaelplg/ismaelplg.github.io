import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidepanelService } from '../../services/sidepanel.service';
import {
  fadeInOutAnimation,
  slideInAnimation,
} from '../../animations/animations';

@Component({
  selector: 'shared-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  animations: [slideInAnimation, fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly sidepanelService = inject(SidepanelService);

  toggleSidepanel() {
    this.sidepanelService.toggleSidePanel();
  }
}
