import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LogotypeComponent } from '../../../shared/components/logotype/logotype.component'

@Component({
    selector: 'app-sign-in',
    imports: [LogotypeComponent],
    templateUrl: './sign-in.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignIn {}
