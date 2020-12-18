import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: String = '';
  body: String = '';

  constructor(private router: Router) {
    const postData = this.router.getCurrentNavigation()?.extras.state?.post;
    if (postData) {
      this.title = postData.title;
      this.body = postData.body;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['']);
  }
}
