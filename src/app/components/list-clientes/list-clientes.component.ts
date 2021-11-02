import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes: any[] = [];
  promedioEdades: Number = 0;
  desviacionEstandar: Number = 0;
  ESPERANZA_VIDA_PERU: Number = 75.22;

  constructor(private _clienteService: ClienteService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getClientes()
  }

  getCalcularFechaDeceso(fechaNacimiento: Date){

    //LocalDate localdate = fechaNacimiento.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

  }

  getClientes() {
    this._clienteService.getClientes().subscribe(data => {
      this.clientes = [];
      let suma: number = 0;
      let sumatoria: number = 0;
      let varianza: number = 0;     
      

      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

        console.log(element.payload.doc.data().edad);
        suma = suma + Number(element.payload.doc.data().edad);

      });
      console.log(this.clientes);

      this.promedioEdades = suma/this.clientes.length;
      console.log("Promedio :" + this.promedioEdades);

      data.forEach((element: any) => {                
        sumatoria = Math.pow(Number(element.payload.doc.data().edad) - Number(this.promedioEdades), 2);
        console.log("sumatoria :" + sumatoria);
        varianza = varianza + sumatoria;
        //console.log("varianza :" + varianza);
      });

      varianza = varianza/this.clientes.length;
      console.log("varianza :" + varianza);

      //calculo de la Desviacion standar
      this.desviacionEstandar = Math.sqrt(varianza);

    });
  }

  eliminarCliente(id: string) {
    this._clienteService.eliminarCliente(id).then(() => {
      console.log('Cliente eliminado con exito');
      this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
