import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';//cambiar por cliente
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';//cqmbiar por cliente
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentaComponent} from './components/venta/venta.component' 
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: SigninComponent},//aqui pongo la ruta inicial del proyecto en mi caso del login
  {path: 'listar-cliente', component: ListarClienteComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'private-tasks', component: PrivateTasksComponent, canActivate: [AuthGuard]},
  {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  {path: 'venta', component: VentaComponent},
  {path: 'crear-cliente', component: CrearClienteComponent},
  {path: 'editar-cliente/:id', component: CrearClienteComponent},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }