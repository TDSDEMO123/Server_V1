import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { Ng4DropdownModule } from 'ng4-material-dropdown';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddbookComponent } from './layout/addbook/addbook.component';
import { AddtagComponent } from './layout/addtag/addtag.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule } from './layout/layout.module';
import { AddgroupComponent } from './layout/addgroup/addgroup.component';
import { AddaccountComponent } from './layout/addaccount/addaccount.component';
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularMultiSelectModule,
        routing,
        LayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        AddbookComponent,
        AddtagComponent,
        AddgroupComponent,
        AddaccountComponent,
        
    
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }