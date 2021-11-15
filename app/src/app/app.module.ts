import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { PicksComponent } from './picks/picks.component';
import { AuthorsComponent } from './authors/authors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { WebService } from './web.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DiscussionComponent,
    PicksComponent,
    AuthorsComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
