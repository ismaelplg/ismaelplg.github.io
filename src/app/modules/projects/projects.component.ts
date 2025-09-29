import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core'
import {
    getStatusColor,
    projects,
    Proyects,
} from '../../shared/utils/proyects.data'
import { ThemeService } from '../../shared/services/theme.service'
import { CommonModule, UpperCasePipe } from '@angular/common'

@Component({
    selector: 'app-projects',
    imports: [CommonModule, UpperCasePipe],
    templateUrl: './projects.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
    themeService = inject(ThemeService)

    proyects = signal<Proyects[]>(projects)
    projectStatus = getStatusColor
}
