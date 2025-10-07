// Definimos la estructura de cada experiencia
export interface Work {
    company: string
    position?: string
    startDate: Time
    endDate?: Time
    description: Description[]
    technologies?: string[]
}

interface Time {
    month: string
    year: string
}

interface Description {
    task: string
}

// Creamos un signal con el array de experiencias
export const experience: Work[] = [
    {
        company: 'Freelance',
        position: 'Software Developer',
        startDate: { month: 'september', year: '2025' },
        description: [
            // {
            //     task: 'Currently part of an international team in London building a dating app, responsible for frontend development and AI implementation for enhanced user experience.',
            // },
            {
                task: 'Co-founding a business venture that develops digital platforms for corporate clients, managing complete projects from website redesign to custom application development.',
            },
        ],
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
        description: [
            {
                task: 'Project Lead for architecture improvement for an Angular project.',
            },
            {
                task: 'Project Lead for Oncology Patient Management in Angular.',
            },
            {
                task: 'Contributor to the development and improvement of the architecture for a doctor application in Flutter.',
            },
            {
                task: 'PHP Developer for JIRA Issue Resolution and Ticketing Systems.',
            },
        ],
        technologies: ['Angular', 'Flutter', 'SQL', 'PHP'],
    },
    {
        company: 'Techmake Solutions',
        position: 'Software Developer Intern',
        startDate: { month: 'june', year: '2022' },
        endDate: { month: 'march', year: '2023' },
        description: [
            {
                task: 'Assisted in the modification and creation of the UI for a real-time monitoring application in Angular and AWS.',
            },
        ],

        technologies: ['Angular'],
    },
    {
        company: 'Freelance',
        position: 'IT Technician',
        startDate: { month: 'may', year: '2015' },
        endDate: {
            month: 'september',
            year: '2023',
        },
        description: [
            {
                task: 'Provided comprehensive IT support and troubleshooting for diverse clients including architecture firms, dental office, construction companies, and individual clients.',
            },
        ],
    },
    {
        company: 'Servicios y Accesorios Computacionales',
        position: 'IT Technician',
        startDate: { month: '', year: '2009' },
        endDate: { month: '', year: '2015' },
        description: [
            {
                task: 'Provided technical support and IT maintenance services ensuring system security and operational efficiency for industrial companies across metallurgical, paper, and manufacturing industries.',
            },
        ],
    },
]
