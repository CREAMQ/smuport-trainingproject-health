import { HomeComponent } from './pages/shell/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShellComponent } from './pages/shell/shell.component';
import { DeclarationComponent } from './pages/shell/declaration/declaration.component';
import { UserinfoComponent } from './pages/shell/userinfo/userinfo.component';
import { StatisticsComponent } from './pages/shell/statistics/statistics.component';
import { UsermanagementComponent } from './pages/shell/usermanagement/usermanagement.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'shell',
    component: ShellComponent
  },
  {
    path: 'shell/declaration',
    component: DeclarationComponent
  },
  {
    path: 'shell/home',
    component: HomeComponent
  },
  {
    path: 'shell/userinfo',
    component: UserinfoComponent
  },
  {
    path: 'shell/statistics',
    component: StatisticsComponent
  },
  {
    path: 'shell/usermanagement',
    component: UsermanagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
