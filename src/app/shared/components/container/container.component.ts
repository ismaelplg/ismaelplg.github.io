import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'shared-container',
    imports: [],
    templateUrl: './container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {}
