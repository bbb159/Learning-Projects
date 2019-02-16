import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MygroupsListComponent } from './groups/mygroups-list/mygroups-list.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupDetailResolver } from './_resolvers/group-detail.resolver';
import { GroupsListResolver } from './_resolvers/groups-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'groups', component: GroupsListComponent, resolve: {groups: GroupsListResolver} },
            { path: 'group/:id', component: GroupDetailComponent, resolve: {group: GroupDetailResolver} },
            { path: 'user/edit', component: UserEditComponent,
             resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'mygroups', component: MygroupsListComponent }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
