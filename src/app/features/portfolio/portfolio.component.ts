import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioComponent {}
