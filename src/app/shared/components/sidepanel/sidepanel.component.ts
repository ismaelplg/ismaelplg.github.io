import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';

@Component({
  selector: 'shared-sidepanel',
  imports: [],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidepanelComponent {
  sidepanelService = inject(SidepanelService);
}
