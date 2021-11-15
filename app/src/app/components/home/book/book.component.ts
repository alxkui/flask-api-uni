import { Component, Input } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  faLongArrowAltRight = faLongArrowAltRight;
  @Input() image!: String;
  @Input() title!: String;

}
