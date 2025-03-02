import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidepanelService {
  public sidePanelOpenSignal = signal<boolean>(false);

  toggleSidePanel() {
    this.sidePanelOpenSignal.update((value) => !value);
  }
}
