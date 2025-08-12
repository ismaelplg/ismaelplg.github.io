import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

import { Certification } from '../../shared/interfaces/certification.interface';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule, ContainerComponent],
  templateUrl: './certifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificationsComponent {
  selectedFilter = signal<'all' | 'completed' | 'in-progress' | 'reviewing'>(
    'all',
  );

  filteredCertification = computed(() => {
    if (this.selectedFilter() === 'all') return this.certifications();
    if (this.selectedFilter() === 'completed') {
      return this.certifications().filter(
        (s) => s.status === 'completed' || s.status === 'reviewing',
      );
    }
    return this.certifications().filter(
      (s) => s.status === this.selectedFilter(),
    );
  });

  certifications = signal<Certification[]>([
    {
      company: 'Udemy',
      teacher: 'Code Bless You',
      course: 'tailwind CSS: beginner to advanced',
      status: 'completed',
      techIcon: ['/icons/tailwindcss.svg', '/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Colt Steele',
      course: 'the web developer bootcamp 2022',
      status: 'completed',
      techIcon: ['/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'JavaScript Moderno: Guía para dominar el lenguaje',
      status: 'completed',
      techIcon: ['/icons/javascript.svg', '/icons/udemy_dark.svg'],
      year: 2022,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando',
      course: 'Angular de cero a experto',
      status: 'reviewing',
      techIcon: ['/icons/angular.svg', '/icons/udemy_dark.svg'],
      year: 2023,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'TypeScript: Tu completa guía y manual de mano.',
      status: 'completed',
      techIcon: ['/icons/typescript.svg', '/icons/udemy_dark.svg'],
      year: 2023,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'RxJs: De cero hasta los detalles',
      status: 'completed',
      techIcon: ['/icons/rxjs.svg', '/icons/udemy_dark.svg'],
      year: 2024,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
      status: 'reviewing',
      techIcon: [
        '/icons/github-dark.svg',
        '/icons/git.svg',
        '/icons/udemy_dark.svg',
      ],
      year: 2024,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'NodeJs: De cero a experto',
      status: 'in-progress',
      techIcon: ['/icons/nodejs.svg', '/icons/udemy_dark.svg'],
      year: 2025,
    },
    {
      company: 'Udemy',
      teacher: 'Fernando Herrera',
      course: 'SQL de cero: Tu guía práctica con PostgreSQL',
      status: 'in-progress',
      techIcon: ['/icons/postgresql.svg', '/icons/udemy_dark.svg'],
      year: 2025,
    },
  ]);
}
