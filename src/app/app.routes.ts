import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FormPageComponent} from './form-page/form-page.component';

export const router: Routes = [
    { path: '', redirectTo: 'form-page', pathMatch: 'full' },
    { path: 'form-page', component: FormPageComponent }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);