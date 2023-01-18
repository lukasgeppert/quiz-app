import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  imports: [
    CommonModule,
    MatProgressSpinnerModule],
  standalone: true
})
export class LoaderComponent {
  isLoading = this.loaderService.isLoading;
  
  constructor(private readonly loaderService: LoaderService) { }
}
