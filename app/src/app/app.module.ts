import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BooksService } from './services/books.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
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
import { DiscussionFormComponent } from './components/discussion-form/discussion-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DiscussionComponent,
    PicksComponent,
    AuthorsComponent,
    BookComponent,
    SingleBookComponent,
    DiscussionFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
