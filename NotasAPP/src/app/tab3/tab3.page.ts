import { Component } from '@angular/core';
import { FontService } from '../servicios/font.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private fontService: FontService) {}

  get isLargeFont(): boolean {
    return this.fontService.getIsLargeFont();
  }

  async toggleFont() {
    await this.fontService.toggleFont();
  }
}
