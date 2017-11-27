import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'',loadChildren:'./framework/framework.module#FrameworkModule'},
  {path:'home',loadChildren:'./home/home.module#HomeModule'},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'},
  {path:'transactions',loadChildren:'./transactions/transactions.module#TransactionsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
