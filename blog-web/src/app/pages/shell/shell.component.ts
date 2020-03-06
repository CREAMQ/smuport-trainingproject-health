import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import{ActivatedRoute,Params} from  '@angular/router';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.less']
})
export class ShellComponent implements OnInit {
  isCollapsed = false;
  username: any;
  auth: any;
  path: string;

  constructor(private router: Router,
    private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      this.username = params['username']
      this.auth = params['auth']
    })
    this.path = location.pathname
    console.log(this.path)
  }
  declaration(){
    this.router.navigate(['shell/declaration'],{queryParams:{username:this.username,auth:this.auth}})
  }
  userinfo(){
    this.router.navigate(['shell/userinfo'],{queryParams:{username:this.username,auth:this.auth}})
  }
  statistics(){
    this.router.navigate(['shell/statistics'],{queryParams:{username:this.username,auth:this.auth}})
  }
  usermanagement(){
    this.router.navigate(['shell/usermanagement'],{queryParams:{username:this.username,auth:this.auth}})
  }
}
