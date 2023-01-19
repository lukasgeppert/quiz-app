import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [{
    path: "",
    component: AuthComponent,
    children: [
        {
            path: 'login',
            component: LoginComponent,
            title: 'Login',
        }, {
            path: 'register',
            component: RegisterComponent,
            title: 'Register',
        }, {
            path: 'change-password',
            component: ChangePasswordComponent,
            title: 'Change Password',
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }