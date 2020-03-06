import { element } from 'protractor';
import { Result } from './../../../models/result';
import { Component, OnInit } from '@angular/core';
import G2 from '@antv/g2/build/g2';
import * as echarts from 'echarts';
import { BlogService } from 'src/app/service/blog.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  public datetime:any= 112121;
  public dateinfo:any={}
  public teminfo:any={}
  public data:any=[]
    username: any;
    auth: any;
  
  constructor( 
    private blogservice: BlogService,
    private activatedRoute:ActivatedRoute,
    private message :NzMessageService,
  ) { }

  ngOnInit() {
  
    this.activatedRoute.queryParams.subscribe((params:Params)=>{
        this.username = params['username']
        this.auth = params['auth']
       
      })
    
  }
  initCharts() {
    const ec = echarts as any;
    const lineChart = ec.init(document.getElementById('lineChart'));  
    const dataAxis = ['~-36.5','36.6-36.9','37.0-37.3','37.4-37.7','37.8-38.1','38.2-38.5','38.6-38.9','39.0-~']
    // const data = [3,15,33,10,3,2,1,0];
    const yMax = 20;
    const dataShadow = [];
    
    for (var i = 0; i < this.data.length; i++) {
        dataShadow.push(yMax);
    }
    const lineChartOption = {
    
        title: {
            text: '体温分布情况',
            // subtext: '********'
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: false,
                textStyle: {
                    color: '#000000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            // z: 10,
            name: '（°C）',
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            },
            name: '（人数）',
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    color: 'rgba(0,0,0,0.05)'
                },
                
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
              
                data: this.data
            }
        ]
    };
    lineChart.setOption(lineChartOption);
  
    var zoomSize = 6;
    lineChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        lineChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.data.length - 1)]
        });
    });
  }



  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.dateinfo ={
        date : result
    }
    this.blogservice.temsum(this.dateinfo).subscribe(Result=>{
        if(Result.err_code==105){
            this.data = Result.data
            this.initCharts();
            console.log('Result',this.data)
        }
        if(Result.err_code==405){
            this.message.error("当天无体温数据")
        }
    })
  }



  
}
