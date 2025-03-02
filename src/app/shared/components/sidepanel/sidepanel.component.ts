import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  fadeInOutAnimation,
  slideInAnimation,
} from '../../animations/animations';

@Component({
  selector: 'shared-sidepanel',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidepanel.component.html',
  animations: [slideInAnimation, fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidepanelComponent {
  public sidepanelService = inject(SidepanelService);

  toggleSidepanel() {
    this.sidepanelService.toggleSidePanel();
  }
}
