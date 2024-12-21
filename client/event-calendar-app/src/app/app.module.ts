import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { EventService } from './services/event.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './security/auth.interceptor';
import { AuthGuard } from './security/auth.guard';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    SchedulerComponent,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,





  ],
  providers: [EventService, AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
