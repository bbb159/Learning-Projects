import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Group } from '../_models/Group';
import { Injectable } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class GroupDetailResolver implements Resolve<Group> {

    constructor(private groupService: GroupService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Group> {
        return this.groupService.getGroup(route.params['id']).catch(error => {
            this.alertify.error('Problemas ao buscar informações');
            this.router.navigate(['/groups']);
            return Observable.of(null);
        });
    }

}
