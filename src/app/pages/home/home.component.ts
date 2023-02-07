import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import * as echarts from 'echarts';
import { country } from 'src/app/models/countries';
import { Participation } from 'src/app/models/participations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService) {}

  chartDom!:any;
  countryDatas : country[]=[
    {
      id:1,
      country:'Italy',
      participations:[],
    },
  ];

  participationDatas : Participation[]=[
    {
      id: 1,
      year: 2012,
      city: "Londres",
      medalsCount: 28,
      athleteCount: 372
    },
    {
      id: 2,
      year: 2016,
      city: "Rio de Janeiro",
      medalsCount: 28,
      athleteCount: 375
    },
    {
      id: 3,
      year: 2020,
      city: "Tokyo",
      medalsCount: 40,
      athleteCount: 381
    }
  ]


  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.chartDom = document.getElementById('main');
    let myChart = echarts.init(this.chartDom);
    let option;


    option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 28, name: 'Italy' },
            { value: 28, name: 'Germany' },
            { value: 40, name: 'Spain' },
            { value: 484, name: 'United State' },
            { value: 484, name: 'United Kingdom' },
            { value: 300, name: 'France' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
