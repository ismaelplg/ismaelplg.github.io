import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidepanelService {
  isToggled = signal<boolean>(false);

  toggleSidepanel(): void {
    this.isToggled.update((v) => !v);
  }
}
