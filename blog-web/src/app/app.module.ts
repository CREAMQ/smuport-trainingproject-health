import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import G2 from '@antv/g2/build/g2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RegisterComponent } from './pages/register/register.component';
import { ShellComponent } from './pages/shell/shell.component';
import { DeclarationComponent } from './pages/shell/declaration/declaration.component';
import { HomeComponent } from './pages/shell/home/home.component';
import { UserinfoComponent } from './pages/shell/userinfo/userinfo.component';
import { StatisticsComponent } from './pages/shell/statistics/statistics.component';
import { UsermanagementComponent } from './pages/shell/usermanagement/usermanagement.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShellComponent,
    DeclarationComponent,
    HomeComponent,
    UserinfoComponent,
    StatisticsComponent,
    UsermanagementComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
