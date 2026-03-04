import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LogotypeComponent } from '../../../shared/components/logotype/logotype.component'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, LogotypeComponent],
    templateUrl: './sign-in.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignIn {}
