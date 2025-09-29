import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
} from '@angular/core'

@Component({
    selector: 'shared-logotype',
    imports: [],
    templateUrl: './logotype.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogotypeComponent implements OnInit {
    colors = signal<string[]>([
        '#42BD78', // Verde profesional → fresco, moderno y confiable
        '#444444', // Gris oscuro → elegante, sobrio y minimalista
        '#B87333', // Cobre → toque cálido, sofisticado y distintivo
        '#2962FF', // Azul eléctrico → moderno, tecnológico y profesional
        '#2E8B57', // Verde esmeralda → elegante, equilibrado y serio
        '#E0E0E0', // Gris claro → neutral, buen contraste en fondo oscuro
        '#37474F', // Azul grisáceo → serio, digital y versátil
        '#FFB300', // Amarillo dorado → sofisticado, enérgico y llamativo
        '#90CAF9', // Azul claro → fresco, amigable y legible
        '#C62828', // Rojo vino oscuro → elegante, fuerte y con carácter
    ])

    currentColor = signal<string>(this.colors()[0])

    getRandomColor = (colors: string[]) => {
        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex]
    }

    ngOnInit(): void {
        setInterval(() => {
            this.currentColor.set(this.getRandomColor(this.colors()))
        }, 2500)
    }
}
