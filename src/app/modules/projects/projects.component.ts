import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { projects, Proyects } from '../../shared/utils/proyects.data';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  proyects = signal<Proyects[]>(projects);
}
