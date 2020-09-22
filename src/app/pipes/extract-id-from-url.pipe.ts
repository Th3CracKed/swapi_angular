import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractIdFromUrl'
})
export class ExtractIdFromUrlPipe implements PipeTransform {

  transform(url: string): string {
    const tokens = url.split('/');
    return tokens[tokens.length - 2];
  }

}
