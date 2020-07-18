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
import { CardService } from './service/cardservice.service';
import { HttpClientModule } from '@angular/common/http';
import { IssueModalComponent } from './modal/issue-modal/issue-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    IssueComponent,
    EnhancementComponent,
    DefectComponent,
    FeatureComponent,
    IssueModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    NgbModule,
    FormsModule
  ],
  exports:[
    DragDropModule
  ],
  entryComponents:[IssueModalComponent],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
