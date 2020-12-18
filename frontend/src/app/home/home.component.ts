import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { timeout, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ height: 0 }), animate(500)]),
      transition(':leave', [animate(500, style({ height: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  id: Number = NaN;
  displayOverlay: boolean = false;
  showErrorMsg: boolean = false;
  idPattern = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.maxLength(2),
  ]);

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  onSend(): void {
    this.displayOverlay = true;
    this.postService
      .getPostById(this.id)
      .pipe(timeout(3000))
      .toPromise()
      .then((data: any) => {
        if (data.found) {
          this.router.navigate([`/posts/${this.id}`], {
            state: { post: data.post },
          });
        } else {
          this.showErrorMsg = true;
          setTimeout(() => (this.showErrorMsg = false), 2000);
        }
        this.displayOverlay = false;
      })
      .catch(() => {
        this.showErrorMsg = true;
        setTimeout(() => (this.showErrorMsg = false), 2000);
        this.displayOverlay = false;
      });
  }
}
