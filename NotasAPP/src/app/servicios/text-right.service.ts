import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TextRightService {
  private isTextRight = false;

  constructor(
    private storage: Storage,
  ) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    const storedTextState = await this.storage.get('isTextRight');
    if (storedTextState !== null) {
      this.isTextRight = storedTextState;
    }
  }

  async toggleText() {
    this.isTextRight = !this.isTextRight;
    console.log('Toggle State:', this.isTextRight);
    await this.storage.set('isTextRight', this.isTextRight);
  }

  getIsTextRight(): boolean {
    return this.isTextRight;
  }
}
