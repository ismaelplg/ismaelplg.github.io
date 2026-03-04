import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core'

import { CommonModule, UpperCasePipe } from '@angular/common'
import { ThemeService } from '../../../shared/services/theme.service'
import {
    Proyects,
    projects,
    getStatusColor,
} from '../../../shared/utils/proyects.data'

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
