import { Component, OnInit } from '@angular/core';
import { DistributionPointService } from 'app/service/distribution-point/distribution-point.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { decodeToken } from 'app/_helpers/jwt.decoder';

@Component({
  selector: 'app-distribution-points',
  templateUrl: './distribution-points.component.html',
  styleUrls: ['./distribution-points.component.scss']
})
export class DistributionPointsComponent implements OnInit {

  newDistributionPoint: FormGroup;
  admin: boolean = false;
  currentUser: any;

  constructor(
    private distributionPointService: DistributionPointService,
    private formBuilder: FormBuilder,
    ) { }

  public distributionPoints: any[];

  ngOnInit() {
    this.loadDistributionPoint();
    this.isAdmin();

    this.newDistributionPoint = this.formBuilder.group({
      mapLink: ['', ,],
      webLink: ['', ,],
      webName: ['', ,],
      description: ['', ,],
    });
  }

  private isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;

    return this.admin;
  }

  loadDistributionPoint() {
    this.distributionPointService.getDistributionPoint().subscribe(
      distributionPoints => {
      this.distributionPoints = distributionPoints;
    });
  }

  public ShowNewDistributionPoint() {
    document.getElementById('newDistributionPoint').style.display = '';
  }

  public HideNewDistributionPoint() {
    this.newDistributionPoint.get('description').setValue('');
    document.getElementById('newDistributionPoint').style.display = 'none';
  }

  public AddNewDistributionPoint() {
    if (this.distributionPointService) {
      this.distributionPointService.addOrUpdateDistributionPoint(this.newDistributionPoint.value).subscribe(c => {
        this.loadDistributionPoint();
        this.newDistributionPoint.get('mapLink').setValue('');
        this.newDistributionPoint.get('webLink').setValue('');
        this.newDistributionPoint.get('webName').setValue('');
        this.newDistributionPoint.get('description').setValue('');
      });
    }
  }
}
