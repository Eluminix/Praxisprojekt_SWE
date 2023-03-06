import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-fridge-navigation',
  templateUrl: './fridge-navigation.component.html',
  styleUrls: ['./fridge-navigation.component.scss']
})
export class FridgeNavigationComponent {

  showFiller = false;


constructor(private breakpointObserver: BreakpointObserver) {}

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


}
