import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './security/auth.guard';
import { RegisterComponent } from './security/register/register.component';


const routes: Routes = [

  {

    path: "",
    component: LoginComponent

  },



  {

    path: "login",
    component: LoginComponent

  },

  {
    path: "event",
    component: SchedulerComponent, canActivate: [AuthGuard]
  },

  {
    path: "register",
    component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
