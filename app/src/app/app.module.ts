import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BooksService } from './services/books.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { PicksComponent } from './components/picks/picks.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookComponent } from './components/home/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleBookComponent } from './components/single-book/single-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DiscussionComponent,
    PicksComponent,
    AuthorsComponent,
    BookComponent,
    SingleBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
