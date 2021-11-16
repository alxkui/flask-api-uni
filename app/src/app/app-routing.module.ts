import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleBookComponent } from './components/single-book/single-book.component';
import { HomeComponent } from './components/home/home.component';
import { PicksComponent } from './components/picks/picks.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { DiscussionComponent } from './components/discussion/discussion.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discussions', component: DiscussionComponent },
  { path: 'top', component: PicksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'book:id', component: SingleBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
