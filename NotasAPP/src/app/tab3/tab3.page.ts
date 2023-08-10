import { Component } from '@angular/core';
import { FontService } from '../servicios/font.service';
import { TextRightService } from '../servicios/text-right.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(
    private fontService: FontService,
    private textRightService: TextRightService
  ) {}

  get isLargeFont(): boolean {
    return this.fontService.getIsLargeFont();
  }

  async toggleFont() {
    await this.fontService.toggleFont();
  }

  get isTextRight(): boolean {
    return this.textRightService.getIsTextRight();
  }

  async toggleText() {
    await this.textRightService.toggleText();
  }
}
