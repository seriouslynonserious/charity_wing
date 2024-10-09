import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BloodWingComponent } from './components/blood-wing/blood-wing.component';
import { HairToCareComponent } from './components/hair-to-care/hair-to-care.component';
import { DrugWingComponent } from './components/drug-wing/drug-wing.component';
import { GiftOfGivingComponent } from './components/gift-of-giving/gift-of-giving.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PalliativeWingComponent } from './components/palliative-wing/palliative-wing.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'blood-wing', component: BloodWingComponent },
  { path: 'hair-to-care', component: HairToCareComponent },
  {path:'palliative-wing',component:PalliativeWingComponent},
  { path: 'drug-wing', component: DrugWingComponent },
  { path: 'gift-of-giving', component: GiftOfGivingComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login as the default route
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
