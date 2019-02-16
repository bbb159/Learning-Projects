import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../_services/group.service';
import { Group } from '../../_models/Group';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups: Group[];

  constructor(private groupService: GroupService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.groups = data['groups'];
    });
  }

}
