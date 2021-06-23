import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  base64Image :any;

  @Input() imageUrl :string = "" ;

  constructor() { }

  ngOnInit(): void {

    
    if(this.imageUrl){
      this.getBase64ImageFromURL(this.imageUrl).subscribe((base64data:any) => {    
        console.log(base64data);
        // this is the image as dataUrl
        this.base64Image = 'data:image/jpg;base64,' + base64data;
      });
    }
 
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      
      if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
           observer.error(err);
        };
      } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
      }
    });
 }

 getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d") ;
  // This will draw image    
  ctx && ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  let dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

}
