import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FontService } from '../servicios/font.service';
import { TextRightService } from '../servicios/text-right.service';

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
  isEditMode = false; // Agrega esta línea para declarar la variable isEditMode
  editedNota: any; // Declaración de la variable editedNota

  constructor(
    private storage: Storage,
    private fontService: FontService,
    private textRightService: TextRightService,
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

  editarNota() {
    this.isEditMode = true; // Activa el modo de edición
    this.editedNota = { ...this.selectedNota }; // Copia el contenido de la nota seleccionada
  }
  
  
  guardarCambios() {
    // Realiza la lógica para guardar los cambios en la nota editada
    const index = this.notas.indexOf(this.selectedNota);
    if (index !== -1) {
      this.notas[index] = { ...this.editedNota }; // Actualiza la nota en el arreglo
  
      this.storage.set('notas', this.notas).then(() => {
        this.selectedNota = { ...this.editedNota }; // Actualiza la nota seleccionada
        this.isEditMode = false; // Desactiva el modo de edición
      });
    }
  }
  
  cancelarEdicion() {
    // Revierte los cambios y desactiva el modo de edición
    this.isEditMode = false;
    this.editedNota = null;
  }
  
  
  // AGRANDAR FUENTES
  get isLargeFont(): boolean {
    return this.fontService.getIsLargeFont();
  }

  async toggleFont() {
    await this.fontService.toggleFont();
  }

  // CAMBIAR TEXTO A IZQUIERDA
  get isTextRight(): boolean {
    return this.textRightService.getIsTextRight();
  }

  async toggleText() {
    await this.textRightService.toggleText();
  }
}
