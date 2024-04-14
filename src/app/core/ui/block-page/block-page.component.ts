import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-block-page',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './block-page.component.html',
  styleUrl: './block-page.component.scss'
})
export class BlockPageComponent {
  @Input() public show: boolean = false;

}
