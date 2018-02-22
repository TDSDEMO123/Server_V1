import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AddtagComponent } from './addtag/addtag.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { AddaccountComponent } from './addaccount/addaccount.component';
import { AuthGuard } from '../_guards/index';

const routes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
           //{ path: '', redirectTo: 'dashboard' },
           
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] },
            { path: 'addbook', component: AddbookComponent, canActivate: [AuthGuard]},
            { path: 'addtag', component: AddtagComponent,canActivate: [AuthGuard] },
            { path: 'addgroup', component: AddgroupComponent,canActivate: [AuthGuard] },
            { path: 'addaccount',component:AddaccountComponent,canActivate: [AuthGuard]},
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
