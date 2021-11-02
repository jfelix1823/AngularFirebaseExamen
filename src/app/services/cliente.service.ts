import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('cliente').add(cliente);
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('cliente', ref => ref.orderBy('apellido', 'asc')).snapshotChanges();
  }

  eliminarCliente(id: string): Promise<any> {
    return this.firestore.collection('cliente').doc(id).delete();
  }

  getCliente(id: string): Observable<any> {
    return this.firestore.collection('cliente').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data:any): Promise<any> {
    return this.firestore.collection('cliente').doc(id).update(data);
  }
}
