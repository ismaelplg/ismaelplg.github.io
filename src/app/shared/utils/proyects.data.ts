// Definimos la estructura de cada experiencia
export interface Proyects {
    id: string
    type: string
    image: string
    imageAlt?: string
    description: string
    status: 'in-progress' | 'completed' | 'paused' | 'canceled' | 'in-queue'
    link?: string
    technologies?: string[]
}

// Creamos un signal con el array de experiencias
export const projects: Proyects[] = [
    {
        id: 'Paco Duran',
        type: 'Personal Portfolio',
        image: 'images/paco-duran/paco-duran-black-logo.png',
        imageAlt: 'images/paco-duran/paco-duran-white-logo.png',
        description:
            'Personal information about Paco Duran a producer, mixer, composer, arranger, engineer and musician from Doulos',
        status: 'completed',
        link: 'https://paco-duran.vercel.app/',
        technologies: ['Angular'],
    },
    {
        id: 'Naturaeat',
        type: 'E-commerce web-app',
        image: 'images/naturaeat/naturaeat.png',
        imageAlt: 'images/naturaeat/naturaeat.png',
        description:
            'E-commerce about a natural products store, committed to offering and creating a healthy and happy community',
        status: 'in-progress',
        link: 'https:/naturaeat.com',
        technologies: ['Angular', 'Shopify'],
    },
]

// Función para asignar color según el status
export function getStatusColor(
    status: 'in-progress' | 'completed' | 'paused' | 'canceled' | 'in-queue'
): string {
    switch (status) {
        case 'completed':
            return 'bg-green-500 text-white'
        case 'in-progress':
            return 'bg-blue-500 text-white'
        case 'paused':
            return 'bg-yellow-500 text-black'
        case 'canceled':
            return 'bg-red-500 text-white'
        case 'in-queue':
            return 'bg-purple-500 text-white'
        default:
            return 'bg-gray-400 text-black'
    }
}
