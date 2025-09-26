// Definimos la estructura de cada experiencia
export interface Work {
  company: string;
  position?: string;
  startDate: Time;
  endDate?: Time;
  description: string;
  technologies?: string[];
}

interface Time {
  month: string;
  year: string;
}

// Creamos un signal con el array de experiencias
export const experience: Work[] = [
  {
    company: 'Freelance',
    position: 'Software Developer',
    startDate: { month: 'september', year: '2025' },
    description: 'Developing and maintaining web applications using modern front-end technologies.',
    technologies: ['Angular', 'React Native'],
  },
  {
    company: 'HMS, Sistemas de Informacion',
    position: 'Software Developer',
    startDate: {
      month: 'september',
      year: '2023',
    },
    endDate: {
      month: 'august',
      year: '2025',
    },
    description:
      'Project Lead for Oncology Patient Management in Angular. \n\nContributor to the development and improvement of the architecture for a doctor application in Flutter.',
    technologies: ['Angular', 'Flutter', 'SQL', 'Flutter'],
  },
  {
    company: 'Techmake Solutions',
    position: 'Software Developer Intern',
    startDate: { month: 'june', year: '2022' },
    endDate: { month: 'march', year: '2023' },
    description:
      'Assisted in the modification and creation of the UI for a real-time monitoring application in Angular and AWS.',
    technologies: ['Angular'],
  },
  {
    company: 'Freelance',
    position: 'IT Technician',
    startDate: { month: '', year: '2015' },
    description:
      'Providing IT support, troubleshooting hardware and software issues for clients, ensuring optimal system performance and security.',
  },
  {
    company: 'Servicios y Accesorios Computacionales',
    position: 'IT Technician',
    startDate: { month: '', year: '2009' },
    endDate: { month: '', year: '2015' },
    description:
      'Provided IT support for various companies, troubleshooting hardware and software issues, performing system maintenance, and ensuring network security and efficiency.',
  },
];
