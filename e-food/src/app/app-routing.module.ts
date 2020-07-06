import { AuthGuard } from './shared-kernel/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((h) => h.HomeModule),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./guest/guest.module').then((h) => h.GuestModule),
  },
  {
    path: 'cart',
    // component: CartComponent
    loadChildren: () => import('./cart/cart.module').then((c) => c.CartModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
