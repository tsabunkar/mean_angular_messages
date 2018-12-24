import { NgModule } from '@angular/core';

import {
  MatInputModule, MatCardModule, MatButtonModule,
  MatToolbarModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule
} from '@angular/material';

// ?Angular Material related module is moved to separate module as -> angular-material.module.ts

@NgModule({
 /*  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ], */
  // *You can remove the imports array and directly exports it, Importing will be done by angular automatically
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [],
  providers: [],
})
export class AngularMaterialModule { }
