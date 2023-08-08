import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private isLargeFont = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    const storedFontState = await this.storage.get('isLargeFont');
    if (storedFontState !== null) {
      this.isLargeFont = storedFontState;
    }
  }

  async toggleFont() {
    this.isLargeFont = !this.isLargeFont;
    console.log('Toggle State:', this.isLargeFont);
    await this.storage.set('isLargeFont', this.isLargeFont);
  }

  getIsLargeFont(): boolean {
    return this.isLargeFont;
  }
}
