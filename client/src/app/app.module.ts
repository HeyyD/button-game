import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { WinnersComponent } from './components/winners/winners.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
