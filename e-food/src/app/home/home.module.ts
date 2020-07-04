import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { homeRoutes } from './home.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [HomeComponent, BannerComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
