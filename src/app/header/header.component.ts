import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
} from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  constructor(
    private readonly router: Router,
    private readonly movieService: MovieService
  ) {}
  search = false;
  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger: any;

  ngOnInit(): void {}

  // ngAfterViewInit(): void {
  // console.log(this.router.url);
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  // const searchTerm = fromEvent(
  //   this.searchInput?.nativeElement,
  //   'keydown'
  // ).pipe(
  //   map((data: any) => {
  //     return data.target.value;
  //   }),
  //   debounceTime(2000),
  //   distinctUntilChanged()
  //   // switchMap((res) => this.movieService.search(1, res))
  // );
  // searchTerm.subscribe((res) => {
  //   console.log(res);
  //   // this.router.navigate(['/search'], {
  //   //   queryParams: { query: this.searchInput?.nativeElement.value },
  //   // });
  // });
  // }
  // onclose() {
  //   this.searchInput.nativeElement.value = '';
  //   console.log(this.searchInput.nativeElement.value);
  // }

  menuenter() {
    this.isMatMenuOpen = true;
  }

  menuLeave(trigger: any) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  buttonEnter(trigger: any) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: any) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      if (this.searchInput.nativeElement.value) {
        this.router.navigate(['/search'], {
          queryParams: { query: this.searchInput?.nativeElement.value },
        });
      }
    }
  }
}
