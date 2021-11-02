import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClienteComponent } from './components/create-cliente/create-cliente.component';
import { ListClientesComponent } from './components/list-clientes/list-clientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-clientes', pathMatch: 'full' },
  { path: 'list-clientes', component: ListClientesComponent },
  { path: 'create-cliente', component: CreateClienteComponent },
  { path: 'editCliente/:id', component: CreateClienteComponent },
  { path: '**', redirectTo: 'list-clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
