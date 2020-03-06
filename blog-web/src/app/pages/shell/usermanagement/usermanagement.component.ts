import { userinfo } from './../userinfo/userinfo';
import { Result } from './../../../models/result';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd';

// interface ItemData {
//   userid: string;
//   username: string;
//   userage: number;
//   usersex: string;
//   usertel: string;
//   authorization: string;
// }

interface ItemData {
  id: string;
  userid: string;
  username: string;
  usersex: string;
  userage: number;
  usertel: string;
  email: string;
  authorization: string;
}

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.less']
})
export class UsermanagementComponent implements OnInit {

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  constructor(
    private blogservice: BlogService,
    private message: NzMessageService
  ) { }


  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    // Object.assign(this.listOfData[index], this.editCache[id].data);
    const array = this.editCache[id].data
    const updateEditCache = {
      userid: this.editCache[id].data.userid,
      username: array.username,
      userage: array.userage,
      usersex: array.usersex,
      usertel: array.usertel,
      email: array.email,
      authorization: array.authorization,
    }
    this.blogservice.infoupdate(updateEditCache).subscribe(Result=>{
      if (Result.err_code==66){
        this.blogservice.userinfo().subscribe(Result => {
          this.listOfData = Result.data
          this.updateEditCache()
        })
        this.message.success('修改成功')

      }
      if(Result.err_code==44){
        this.message.success('发生错误，请重试')
      }
    })
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  ngOnInit() {
    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     id: `${i}`,
    //     userid: `${i}`,
    //     username:`qwww`,
    //     usersex:`nan`,
    //     userage:23,
    //     usertel:`1313133`,
    //     email:`113213@123212.com`,
    //     authorization:`gly`
    //   });
    // }

    this.blogservice.userinfo().subscribe(Result => {
      this.listOfData = Result.data
      this.updateEditCache()
      console.log('2', this.listOfData)
    })


  }
}