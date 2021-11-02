import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  createCliente: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';

  constructor(private fb: FormBuilder,
    private _clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    //this.esEditar();
  }

  agregarEditarCliente() {
    this.submitted = true;

    if (this.createCliente.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.id);
    }

  }

  agregarCliente() {
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      edad: this.createCliente.value.edad,
      fechaNacimiento: this.createCliente.value.fechaNacimiento,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() => {
      this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-clientes']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarCliente(id: string) {

    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      edad: this.createCliente.value.edad,
      fechaNacimiento: this.createCliente.value.fechaNacimiento,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._clienteService.actualizarCliente(id, cliente).then(() => {
      this.loading = false;
      this.toastr.info('El cliente fue modificado con exito', 'Cliente modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-clientes']);
    })
  }


  esEditar() {
    this.titulo = 'Editar Cliente'
    if (this.id !== null) {
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe(data => {
        this.loading = false;
        this.createCliente.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          edad: data.payload.data()['edad'],
          fechaNacimiento: data.payload.data()['fechaNacimiento'],
        })
      })
    }
  }

}
