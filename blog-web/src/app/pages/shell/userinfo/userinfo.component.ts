import { Result } from './../../../models/result';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd';
import { userinfo } from './userinfo';
import { OfficialData } from './data';




interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}



@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.less']
})
export class UserinfoComponent implements OnInit {
  auth: any;
  username: any;
  public list:object = {}
  public conditionlist:object = {}
  // public listtt:any = ['1','2','3']
  public listOfCondition:any = []
  public listOfTem:any = []
  public listOfPosition:any = []
  public listOfDate:any = []
  pageSize = 4;
  loading = true;

  constructor(
    private activatedRoute:ActivatedRoute,
    private blogservice: BlogService,
    private message :NzMessageService,
    ) { }

  
    



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      this.username = params['username']
      this.auth = params['auth']
      console.log(this.username)
    })
    this.loading = true;
      const userinformation={
        username : this.username
      }
      this.blogservice.getuserinfo(userinformation).subscribe(Result =>{
        if(Result.err_code == 160){
          this.list={
            userid : Result.data.userid,
            usersex : Result.data.usersex,
            userage : Result.data.userage,
            usertel : Result.data.usertel,
            email : Result.data.email,
            regtime : Result.data.registertime,
          }
         
        }
        if(Result.err_code == 400){
          this.message.error("该用户不存在，请先注册")
        }
      })

        this.blogservice.getusercondition(userinformation).subscribe(Result=>{
          if(Result.err_code == 170){
            this.conditionlist={
              data : Result.data
            }
            for(let c of Result.data){

              this.listOfCondition.push(c.data)
              this.loading = false
            }
          }
          if(Result.err_code == 404){
            this.message.error("该用户不存在，请先注册")
          }
        })
  }

}
