import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FontService } from '../servicios/font.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  titulo: string = '';
  texto: string = '';

  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private fontService: FontService
  ) {
    this.initStorage();
  }

  async initStorage() {
    this.storage = await this.storage.create();
  }  

  async guardarDatos() {
    if (this.titulo.length >= 3 && this.titulo.length <= 50 && this.texto.length >= 5 && this.texto.length <= 1000) {
      const nuevaNota = {
        titulo: this.titulo,
        texto: this.texto,
      };
    let notas = await this.storage.get('notas') || [];
    notas.push(nuevaNota);
    await this.storage.set('notas', notas);
    console.log('Nota guardada:', nuevaNota);

    const toast = await this.toastController.create({
      icon: 'checkmark-circle',
      message: 'Nota agregada exitosamente',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.limpiarTexto();
  } else {
    console.log('Error: Los campos no cumplen con la longitud requerida.');

    const toast = await this.toastController.create({
      icon: 'close-circle',
      message: 'Error al agregar nota',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
  const textoSinSaltos = this.texto.replace(/\r?\n/g, '\\n');

  const nuevaNota = {
    titulo: this.titulo,
    texto: textoSinSaltos
  };
}

  async cargarDatos() {
    const nota = await this.storage.get('nota');
    if (nota) {
      this.titulo = nota.titulo;
      this.texto = nota.texto.replace(/\\n/g, '\n');
    }
  }

  async limpiarTexto() {
    this.titulo = '';
    this.texto = '';
  }

    // AGRANDAR FUENTES
    get isLargeFont(): boolean {
      return this.fontService.getIsLargeFont();
    }
  
    async toggleFont() {
      await this.fontService.toggleFont();
    }
}
