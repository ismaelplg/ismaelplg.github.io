import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { experience, Work } from '../../shared/utils/experience.data';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [UpperCasePipe],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent {
  currentWork = signal<Work[]>(experience);
}
