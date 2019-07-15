import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
     { path: 'dashboard', component: DashboardComponent },
    { path: 'settings', component:SettingsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ComponentsRoutingModule{}
