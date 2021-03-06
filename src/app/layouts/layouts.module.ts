import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent
    ]
})
export class LayoutsModule { }