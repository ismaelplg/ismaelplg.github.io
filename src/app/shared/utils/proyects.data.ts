// Definimos la estructura de cada experiencia
export interface Proyects {
  id: string;
  type: string;
  image: string;
  description: string;
  link?: string;
  technologies?: string[];
}

// Creamos un signal con el array de experiencias
export const projects: Proyects[] = [
  {
    id: 'Paco Duran',
    type: 'Personal Portfolio',
    image: 'images/paco-duran-black-logo.png',
    description:
      'Personal information about Paco Duran a producer, mixer, composer, arranger, engineer and musician from Doulos',
    link: 'https://paco-duran.vercel.app/',
    technologies: ['Angular'],
  },
];
