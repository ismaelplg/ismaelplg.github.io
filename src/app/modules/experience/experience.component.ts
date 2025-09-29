import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import { CommonModule } from '@angular/common'
import { experience, Work } from '../../shared/utils/experience.data'

@Component({
    selector: 'app-experience',
    imports: [CommonModule],
    templateUrl: './experience.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExperienceComponent {
    experiences = signal<Work[]>(experience)
}
