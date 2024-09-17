import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LocalityService } from '../../../services/locality.service.js';
import { LocalityAddDialogComponent } from '../locality-add-dialog/locality-add-dialog.component.js';


@Component({
  selector: 'app-locality-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './locality-add.component.html',
  styleUrl: './locality-add.component.css'
})
export class LocalityAddComponent {
  @Output() localityAdded = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private localityService: LocalityService) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(LocalityAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const localityData = result;
        console.log(localityData);
        this.localityService.addLocality(localityData).subscribe({
          next: (response) => {
            console.log('Locality added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding locality:', error);
          }
        });
      }
    });
  }
}
