import { Result } from './../../models/result';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  path: any;
  isShown: boolean;
  constructor(
    private blogservice: BlogService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isShown = false
    
    this.path = location.pathname

  }
  login() {
    const userinfo = {
      username: this.username,
      pwd: this.password
    }
    console.log("user", userinfo)
    this.blogservice.login(userinfo).subscribe(Result => {
      if (Result.err_code == 100) {
        this.message.success("登录成功！")
        this.router.navigate(['shell/home'], { queryParams: { username: userinfo.username, auth: Result.auth } })
        // this.router.navigate(['/shell',this.username],{queryParams:{username:this.username}})
      }
      if (Result.err_code == 200) {
        this.message.error("密码错误！请重试")
      }
      if (Result.err_code == 400) {
        this.message.error("该用户名不存在！")
      }
    }

    )
  }
}
