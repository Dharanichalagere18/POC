import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
// 
import { AdvancesearchComponent } from './search/advancesearch.component';

const routes: Routes = [
  {
    path:'filter',component:FilterComponent
  },
  {
    path:'search',component:AdvancesearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
