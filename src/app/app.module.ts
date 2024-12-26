import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // This already contains RouterModule configuration
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { BloodWingComponent } from './components/blood-wing/blood-wing.component';
import { DrugWingComponent } from './components/drug-wing/drug-wing.component';
import { GiftOfGivingComponent } from './components/gift-of-giving/gift-of-giving.component';
import { HairToCareComponent } from './components/hair-to-care/hair-to-care.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { DonationComponent } from './components/donation/donation.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './components/admin/admin.component';
import { PalliativeWingComponent } from './components/palliative-wing/palliative-wing.component';

@NgModule({
  declarations: [
    AppComponent,
    BloodWingComponent,
    DrugWingComponent,
    GiftOfGivingComponent,
    HairToCareComponent,
    HomeComponent,
    LoginComponent,
    DonationComponent,
    ContactUsComponent,
    AdminComponent,
    PalliativeWingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // Make sure this is required, otherwise you can use the standard animations provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
