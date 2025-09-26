import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogotypeComponent } from '../logotype/logotype.component';
import { SidepanelComponent } from '../sidepanel/sidepanel.component';
import { SidepanelService } from '../../services/sidepanel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-navbar',
  imports: [LogotypeComponent, SidepanelComponent, CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  sidepanelService = inject(SidepanelService);
}
