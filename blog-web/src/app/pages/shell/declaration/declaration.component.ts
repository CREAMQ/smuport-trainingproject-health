import { Component, OnInit } from '@angular/core';
import { NzCascaderOption, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

const provinces = [
  { value: '北京市',label: '北京市'},
  { value: '天津市',label: '天津市'},
  { value: '河北省',label: '河北省'},
  { value: '山西省',label: '山西省'},
  { value: '内蒙古自治区',label: '内蒙古自治区'},
  { value: '辽宁省',label: '辽宁省'},
  { value: '吉林省',label: '吉林省'},
  { value: '黑龙江省',label: '黑龙江省'},
  { value: '上海市',label: '上海市'},
  { value: '江苏省',label: '江苏省'},
  { value: '浙江省',label: '浙江省'},
  { value: '安徽省',label: '安徽省'},
  { value: '福建省',label: '福建省'},
  { value: '江西省',label: '江西省'},
  { value: '山东省',label: '山东省'},
  { value: '河南省',label: '河南省'},
  { value: '湖北省',label: '湖北省'},
  { value: '湖南省',label: '湖南省'},
  { value: '广东省',label: '广东省'},
  { value: '广西壮族自治区',label: '广西壮族自治区'},
  { value: '海南省',label: '海南省'},
  { value: '重庆市',label: '重庆市'},
  { value: '四川省',label: '四川省'},
  { value: '贵州省',label: '贵州省'},
  { value: '云南省',label: '云南省'},
  { value: '西藏自治区',label: '西藏自治区'},
  { value: '陕西省',label: '陕西省'},
  { value: '甘肃省',label: '甘肃省'},
  { value: '青海省',label: '青海省'},
  { value: '宁夏回族自治区',label: '宁夏回族自治区'},
  { value: '新建维吾尔自治区',label: '新建维吾尔自治区'},
  { value: '香港特别行政区',label: '香港特别行政区'},
  { value: '澳门特别行政区',label: '澳门特别行政区'},
  { value: '台湾省',label: '台湾省'},
  { value: '江苏省',label: '江苏省'},
];

const cities: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  浙江省: [
    {value: 'hangzhou',label: 'Hangzhou'},
    {value: 'ningbo',label: 'Ningbo'}
  ],
  江苏省: [
    {
      value: 'nanjing',
      label: 'Nanjing'
    }
  ]
};

const scenicspots: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }
  ]
};


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.less']
})
export class DeclarationComponent implements OnInit {
  values: string[] | null = null;
  validateForm: FormGroup;
  username: any;
  auth: any;

  constructor(private blogservice: BlogService,
    private message :NzMessageService,
    private router: Router,
    private activatedRoute:ActivatedRoute,) { }

  ngOnInit():void {
    this.validateForm = new FormGroup({
      condition: new FormControl('',[Validators.required]),
      temperature: new FormControl('',[Validators.required]),
      position : new FormControl('',[Validators.required]),
    });
    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      this.username = params['username']
      this.auth = params['auth']
      console.log(this.username)
    })

  }

  // onChanges(values: string[]): void {
  //   console.log(values);
  // }
  /** load data async execute by `nzLoadData` method */
  loadData(node: NzCascaderOption, index: number): PromiseLike<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (index < 0) {
          // if index less than 0 it is root node
          node.children = provinces;
        } else if (index === 0) {
          node.children = cities[node.value];
        } else {
          node.children = scenicspots[node.value];
        }
        resolve();
      }, 1000);
    });
  }

  submit(){
    const healthConditionInfo={
      username : this.username,
      condition : this.validateForm.value.condition,
      temperature : this.validateForm.value.temperature,
      position : this.validateForm.value.position,
    }
    console.log("健康信息", healthConditionInfo)
    this.blogservice.submit(healthConditionInfo).subscribe(Result=>{
      if(Result.err_code == 400){
        this.message.error("该用户不存在，请先注册")
      }
      if(Result.err_code == 150){
        this.message.success("健康信息申报成功")
        this.router.navigate(['shell/home'],{queryParams:{username:this.username,auth:this.auth}})
        
      }
    })
  }
}
