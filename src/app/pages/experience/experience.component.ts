import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Work } from '../../shared/interfaces/work.interface';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-work',
  imports: [UpperCasePipe],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WorkComponent {
  works = signal<Work[]>([
    {
      company: 'HMS, Sistemas de Informacion',
      position: 'Software Developer',
      startDate: { month: 'sep', year: '2023' },
      description:
        'Project Lead for Oncology Patient Management in Angular. \n\nContributor to the development and improvement of the architecture for a doctor application in Flutter.',
    },
    {
      company: 'Techmake Solutions',
      position: 'Software Developer Intern',
      startDate: { month: 'jun', year: '2022' },
      endDate: { month: 'mar', year: '2023' },
      description:
        'Assisted in the modification and creation of the UI for a real-time monitoring application in Angular and AWS.',
    },
    {
      company: 'Freelance',
      position: 'Software Developer | IT Technician',
      startDate: { month: '', year: '2015' },
      description:
        'I was the lead developer of the project, responsible for the development of the entire system, from the design to the implementation.',
    },
    {
      company: 'Servicios y Accesorios Computacionales',
      position: 'IT Technician',
      startDate: { month: '', year: '2015' },
      endDate: { month: '', year: '2016' },
      description:
        'Responsible for the development of the entire system, from the design to the implementation.',
    },
  ]);
}
