import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { MygroupsListComponent } from './groups/mygroups-list/mygroups-list.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { GroupService } from './_services/group.service';
import { GroupCardComponent } from './groups/group-card/group-card.component';
import { AuthModule } from './auth/auth.module';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupDetailResolver } from './_resolvers/group-detail.resolver';
import { GroupsListResolver } from './_resolvers/groups-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    GroupsListComponent,
    MygroupsListComponent,
    GroupCardComponent,
    GroupDetailComponent,
    UserEditComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    GroupService,
    GroupDetailResolver,
    GroupsListResolver,
    UserEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
