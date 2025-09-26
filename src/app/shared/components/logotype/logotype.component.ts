import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidepanelService } from '../../services/sidepanel.service';
import { routes } from '../../../app.routes';

@Component({
  selector: 'shared-logotype',
  imports: [RouterLink],
  templateUrl: './logotype.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogotypeComponent {
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
  ]);

  getRandomColor = (colors: string[]) => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  sidepanelService = inject(SidepanelService);

  route = routes.map((r) => r.children).flat();

  offset = 70; // scroll offset

  constructor(private router: Router) {}

  scrollTo(routePath: string, fragment: string) {
    if (!fragment) return; // evita scroll si no hay fragment
    this.router.navigate([routePath]).then(() => {
      const el = document.getElementById(fragment);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - this.offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  }
}
