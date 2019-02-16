import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../_services/group.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../../_models/Group';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group;

  constructor(private groupService: GroupService, private alertify: AlertifyService, private route: ActivatedRoute,
              private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.group = data['group'];
    });
  }

  joinGroup(id) {
    this.userService.joinGroup(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('Você acabou de entrar no grupo ' + this.group.descricao);
    }, error => {
      this.alertify.error(error);
    });
    this.router.navigate(['/mygroups']);
  }
}
