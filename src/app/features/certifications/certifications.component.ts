import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Certification } from '../../shared/interfaces/certification.interface';

@Component({
  selector: 'app-certifications',
  imports: [],
  templateUrl: './certifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificationsComponent {
  certifications = signal<Certification[]>([
    {
      company: 'Udemy',
      teacher: 'Code Bless You',
      course: 'tailwind CSS: beginner to advanced',
      techIcon: ['/icons/tailwindcss.svg', '/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Colt Steele',
      course: 'the web developer bootcamp 2022',
      techIcon: ['/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'JavaScript Moderno: Guía para dominar el lenguaje',
      techIcon: ['/icons/javascript.svg', '/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando',
      course: 'Angular de cero a experto',
      techIcon: ['/icons/angular.svg', '/icons/udemy_dark.svg'],
      year: 2023,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'TypeScript: Tu completa guía y manual de mano.',
      techIcon: ['/icons/typescript.svg', '/icons/udemy_dark.svg'],
      year: 2023,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'RxJs: De cero hasta los detalles',
      techIcon: ['/icons/rxjs.svg', '/icons/udemy_dark.svg'],
      year: 2024,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
      techIcon: [
        '/icons/github-dark.svg',
        '/icons/git.svg',
        '/icons/udemy_dark.svg',
      ],
      year: 2024,
    },
  ]);
}
