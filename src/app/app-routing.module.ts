import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from './auth/auth-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MostLikedComponent } from './pages/most-liked/most-liked.component';

const routes: Routes = [
  ...AuthRoutes,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'most-liked',
    component: MostLikedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
