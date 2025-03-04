import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Work } from '../../shared/interfaces/work.interface';

@Component({
  selector: 'app-work',
  imports: [],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WorkComponent {
  works = signal<Work[]>([
    {
      company: 'HMS, Sistemas de Informacion',
      position: 'Software Developer',
      startDate: { month: 'september', year: '2023' },
      description:
        'Project Lead for Oncology Patient Management in Angular. \n\nContributor to the development and improvement of the architecture for a doctor application in Flutter.',
    },
    {
      company: 'Techmake Solutions',
      position: 'Software Developer Intern',
      startDate: { month: 'june', year: '2022' },
      endDate: { month: 'march', year: '2023' },
      description:
        'Assisted in the modification and creation of the UI for a real-time monitoring application in Angular and AWS.',
    },
    {
      company: 'Freelance',
      position: 'Software Developer | IT Technician',
      startDate: { month: '', year: '2015' },
      description:
        'Developing and maintaining web applications using modern front-end technologies. \n\nProviding IT support, troubleshooting hardware and software issues for clients, ensuring optimal system performance and security.',
    },
    {
      company: 'Servicios y Accesorios Computacionales',
      position: 'IT Technician',
      startDate: { month: '', year: '2009' },
      endDate: { month: '', year: '2015' },
      description:
        'Provided IT support for various companies, troubleshooting hardware and software issues, performing system maintenance, and ensuring network security and efficiency.',
    },
  ]);
}
