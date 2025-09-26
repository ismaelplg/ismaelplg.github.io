import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-sidepanel',
  imports: [RouterLink],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidepanelComponent {
  sidepanelService = inject(SidepanelService);
}
