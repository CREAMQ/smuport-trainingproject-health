import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeclarationComponent } from './declaration/declaration.component';
import { ShellComponent } from './shell.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

const routes: Routes = [
    { 
        path: 'shell', 
        component: ShellComponent,
        children:[
            { path:'home', component:HomeComponent},
            { path:'declaration',component:DeclarationComponent },
            { path:'userinfo', component:UserinfoComponent},
            { path:'statistics', component:StatisticsComponent},
            { path:'usermanagement', component:UsermanagementComponent},
        ]
    },
   
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellRoutingModule { }