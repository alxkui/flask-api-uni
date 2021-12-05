import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleBookComponent } from './components/single-book/single-book.component';
import { HomeComponent } from './components/home/home.component';
import { PicksComponent } from './components/picks/picks.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discussions', component: DiscussionComponent },
  { path: 'top', component: PicksComponent },
  { path: 'book/:id', component: SingleBookComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
