import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { DonateComponent } from './donate/donate.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"search", pathMatch: 'prefix',component:SearchComponent},
  {path:"result/:location", component:ResultComponent},
  {path:"donate", component:DonateComponent},
  {path:"video", component:VideoComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
