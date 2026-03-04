import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { UpperCasePipe } from '@angular/common'
import { experience, Work } from '../../../shared/utils/experience.data'

@Component({
    selector: 'app-about',
    imports: [UpperCasePipe],
    templateUrl: './about.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent {
    currentWork = signal<Work[]>(experience)
}
