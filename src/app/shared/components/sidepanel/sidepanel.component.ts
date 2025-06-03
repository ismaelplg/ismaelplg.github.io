import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  fadeInOutAnimation,
  slideInAnimation,
} from '../../animations/animations';

import { routes } from '../../../app.routes';

@Component({
  selector: 'shared-sidepanel',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidepanel.component.html',
  animations: [slideInAnimation, fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidepanelComponent {
  public sidepanelService = inject(SidepanelService);

  public menuItems = routes
    .map((r) => r.children ?? [])
    .flat()
    .filter((r) => r && r.path)
    .filter((r) => !r.path?.includes('**'));

  toggleSidepanel() {
    this.sidepanelService.toggleSidePanel();
  }
}
