import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FontService } from '../servicios/font.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notas: any[] = []; // Arreglo para almacenar las notas
  isModalOpen = false; // Modal de ionic para que este desactivado
  selectedNota: any = {}; // Variable para la nota seleccionada
  isDeleteModalOpen = false; // Agrega esta propiedad para el modal de confirmación

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private fontService: FontService
  ) {
    this.initStorage();
    this.cargarNotas();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
    this.cargarNotas();
  }
  async initStorage() {
    this.storage = await this.storage.create();
  }

  async cargarNotas() {
    const notas = await this.storage.get('notas');
    if (notas) {
      this.notas = notas;
    }
  }

  abrirModal(nota: any) {
    this.selectedNota = nota; // Establecer la nota seleccionada
    this.setOpen(true); // Abrir el modal
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  borrarModal(nota: any) {
    this.selectedNota = nota; // Establecer la nota seleccionada
    this.setDeleteModalOpen(true); // Abrir el modal de confirmación
  }

  setDeleteModalOpen(isOpen: boolean) {
    this.isDeleteModalOpen = isOpen;
  }

  eliminarNota() {
    // Aquí puedes realizar la lógica para eliminar la nota
    const index = this.notas.indexOf(this.selectedNota);
    if (index !== -1) {
      this.notas.splice(index, 1); // Elimina la nota del arreglo
      this.storage.set('notas', this.notas); // Actualiza el almacenamiento
      this.setDeleteModalOpen(false); // Cierra el modal de confirmación
    }
  }
  // AGRANDAR FUENTES
  get isLargeFont(): boolean {
    return this.fontService.getIsLargeFont();
  }

  async toggleFont() {
    await this.fontService.toggleFont();
  }
}
