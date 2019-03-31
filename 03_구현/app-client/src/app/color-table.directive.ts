import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ColorTable]'
})
export class ColorTableDirective {

  @Input() curFcolor:string;

  constructor() { }

  ngOnInit(){
  }

}
