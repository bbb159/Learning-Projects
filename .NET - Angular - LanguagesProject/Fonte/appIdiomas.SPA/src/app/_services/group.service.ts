import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Group } from '../_models/Group';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class GroupService {

    baseUrl = environment.apiUrl;

constructor(private authHttp: AuthHttp) { }

getGroups(): Observable<Group[]> {
    return this.authHttp.get(this.baseUrl + 'grupos')
    .map(response => <Group[]>response.json())
    .catch(this.handleError);
}

getGroup(id): Observable<Group> {
    return this.authHttp.get(this.baseUrl + 'grupos/' + id)
    .map(response => <Group>response.json())
    .catch(this.handleError);
}

private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(modelStateErrors || 'Server Error');
}

}
