import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';
import { routes } from '../../../app.routes';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'shared-sidepanel',
  imports: [RouterLink],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidepanelComponent {
  sidepanelService = inject(SidepanelService);

  routes = routes.map((r) => r.children).flat();

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
