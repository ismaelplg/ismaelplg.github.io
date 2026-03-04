import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ContainerComponent } from '../../shared/components/container/container.component'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component'
import AboutComponent from '../modules/about/about.component'
import { ContactComponent } from '../modules/contact/contact.component'
import ExperienceComponent from '../modules/experience/experience.component'
import HomeComponent from '../modules/home/home.component'
import { ProjectsComponent } from '../modules/projects/projects.component'
import { RouterLink } from '@angular/router'

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
        RouterLink,
    ],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
    date: Date = new Date()

    backToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
}
