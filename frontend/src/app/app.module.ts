import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueComponent } from './issue/issue.component';
import { EnhancementComponent } from './issue/enhancement/enhancement.component';
import { DefectComponent } from './issue/defect/defect.component';
import { FeatureComponent } from './issue/feature/feature.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    IssueComponent,
    EnhancementComponent,
    DefectComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule 
  ],
  exports:[
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
