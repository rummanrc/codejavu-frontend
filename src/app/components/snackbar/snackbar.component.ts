import {Component} from '@angular/core';
import {ErrorService} from "../../services/error/error.service";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {

  message: string = "";
  isShow: boolean = false;

  constructor(private _error: ErrorService) {
    _error.getMessage().subscribe({
      next: value => {
        this.showSnackBar(value);
      }
    });
  }

  private showSnackBar(value: string): void {
    this.message = value;
    this.isShow = value.length > 0;
    setTimeout(() => {
      this.clearSnackBar();
    }, 3000);
  }

  private clearSnackBar(): void {
    this.isShow = false;
    this.message = '';
    this._error.clearMessage();
  }
}
