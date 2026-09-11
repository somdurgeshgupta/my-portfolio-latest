import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Som Durgesh Gupta | Senior MEAN Stack Developer' },
  {
    path: 'projects/carrot-ai',
    loadComponent: () => import('./carrot-docs/carrot-docs.component').then(m => m.CarrotDocsComponent),
    title: 'Carrot AI — Architecture & Project Documentation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
