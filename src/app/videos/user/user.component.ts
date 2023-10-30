import { Component, DestroyRef, Input, inject } from '@angular/core';
import { UserInterface } from 'src/shared/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent{
  destroyRef$ = inject(DestroyRef);

  @Input() userData: UserInterface;
  @Input() fontColor: string = 'blacks';
  @Input() fontSize: string = '14px';
  @Input() fontStyle: string = '400';
  @Input() imageSize: string = '24px';
}
