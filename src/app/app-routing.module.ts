import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'dashboard', loadChildren: () => import('./pages/panel-de-control/panel-de-control.module').then(m => m.PanelDeControlModule)
  // },
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
