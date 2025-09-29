import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  isDark = signal<boolean>(false);

  constructor() {
    // Check initial theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    this.isDark.set(initialDark);
    this.applyTheme(initialDark);
  }

  toggleTheme() {
    this.isDark.update((value) => !value);
    this.applyTheme(this.isDark());
    console.log(this.isDark());
  }

  private applyTheme(isDark: boolean) {
    const html = this.document.documentElement;

    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
