import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Hello world");
    
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log(params['id']);
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
