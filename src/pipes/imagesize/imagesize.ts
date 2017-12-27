import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imagesize',})
export class ImagesizePipe implements PipeTransform {

  transform(url: string, ...args) {
    let urlReturn = url.split('@')[0]
    urlReturn = urlReturn +`@._V1_SY${args[0]}_CR0,0,,${args[0]}_AL_.jpg`;
    return urlReturn;
  }
}
