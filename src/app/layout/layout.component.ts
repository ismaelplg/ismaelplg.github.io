import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import HomeComponent from '../modules/home/home.component'
import AboutComponent from '../modules/about/about.component'
import { ProjectsComponent } from '../modules/projects/projects.component'
import ExperienceComponent from '../modules/experience/experience.component'
import { ContainerComponent } from '../shared/components/container/container.component'
import { ContactComponent } from '../modules/contact/contact.component'
;('../modules/about/about.component')

@Component({
    selector: 'app-layout',
    imports: [
        NavbarComponent,
        HomeComponent,
        AboutComponent,
        ProjectsComponent,
        ExperienceComponent,
        ContainerComponent,
        ContactComponent,
    ],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
