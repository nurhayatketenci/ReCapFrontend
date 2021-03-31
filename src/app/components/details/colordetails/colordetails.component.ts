import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colordetails',
  templateUrl: './colordetails.component.html',
  styleUrls: ['./colordetails.component.css']
})
export class ColordetailsComponent implements OnInit {
  colors:Color[]
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    });
  }
}
