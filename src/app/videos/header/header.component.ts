import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UrlPath } from 'src/shared/constants/url-path';
import { UserInterface } from 'src/shared/interfaces/user.interface';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  destroyRef$ = inject(DestroyRef);
  authService = inject(AuthService);
  router = inject(Router);

  userSignalData = this.authService.usersSignalService$;

  get isListPage() {
    if(this.router.url === UrlPath.videos) {
      return true;
    } else {
      return false;
    }
  }

  navigateToVideoList() {
    this.router.navigate(['videos']);
  }
}
