import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'shared-container',
  imports: [],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  title = input.required<string>();
}
