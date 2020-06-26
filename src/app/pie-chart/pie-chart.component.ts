import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ChartType, ChartOptions} from 'chart.js';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts'; 

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy{ 

  /*{"Energy Consumption":
	[
	{
		"Unit Id":60,
		"Consumption":340
	}
	,{
		"Unit Id":61,
		"Consumption":340
	}
]
}*/

/*{"Energy Consumption":
	[
	{
		"Unit Id":60,
		"Consumption":340
	}
	,{
		"Unit Id":61,
		"Consumption":340
  },
  {
		"Unit Id":60,
		"Consumption":340
  },
  {
		"Unit Id":60,
		"Consumption":340
	}
]
}*/

/*{"Energy Consumption":
	[
	{
		"Unit Id":60,
		"Consumption":340
	}
	,{
		"Unit Id":61,
		"Consumption":150
  },
  {
		"Unit Id":62,
		"Consumption":225
  },
  {
		"Unit Id":63,
		"Consumption":340
  },
  {
		"Unit Id":64,
		"Consumption":150
  },
  {
		"Unit Id":65,
		"Consumption":239
  },
  {
		"Unit Id":66,
		"Consumption":34
  },
  {
		"Unit Id":67,
		"Consumption":450
	}
]
}*/

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
 pieChartLabels: Label[] = ['SciFi', 'Drama', 'Comedy'];
  pieChartData: SingleDataSet = [30, 50, 20];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors = [{
    backgroundColor: ['rgba(255,90,200,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(10, 100, 100, 0.5)', 'rgba(255,192,203 ,1 )', 'rgba(225, 225, 0, 1)','rgb(255,0,255)', 'rgba(0, 181, 204, 1)'],
  },];
  

  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) {monkeyPatchChartJsTooltip();
  monkeyPatchChartJsLegend(); /*_mqttService.connect({username: 'esp', password: 'ptlesp01'})*/}

  /*constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();



  }*/

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  subscribeNewTopic(): void {

    

    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    });
    this.logMsg('subscribed to topic: ' + this.topicname)
console.log("this.mag = " + this.msg.payload.toString());

    var JSONobj = JSON.parse(this.msg.payload.toString())

    var entries = JSONobj["Energy Consumption"]

    var sizeof = entries.length

    console.log(sizeof)

    console.log("enrties[0] = " + entries[0].toString())

    var i = 0

    entries.forEach(function(obj) {

      console.log(obj["Unit Id"]  + "\n")

      /*this.pieChartLabels[i] = 'Unit Id: ' + obj["Unit Id"].toString()
      this.pieChartData[i] = obj["Consumption"]

      i++*/

      console.log('Unit Id: ' + obj["Unit Id"].toString())
      console.log(obj["Consumption"])

    })

   

    entries.forEach(function(obj) {

      //console.log(obj["Unit Id"]  + "\n")

      /*this.pieChartLabels.push('Unit Id: ' + obj["Unit Id"].toString())
      this.pieChartData.push(obj["Consumption"])*/

      i++

      /*console.log('Unit Id: ' + obj["Unit Id"].toString())
      console.log(obj["Consumption"])*/

    })

    this.pieChartData = []
    this.pieChartLabels = []

    for(var i = 0; i < entries.length; i++){

      this.pieChartLabels.push('Unit Id: ' + entries[i]["Unit Id"].toString())
      this.pieChartData.push(entries[i]["Consumption"])

    }


    //this.pieChartLabels = ['Unit ID', 'Unit', 'ID']
    //this.pieChartData = [10, 15, 20]

   /* monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();*/

  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }
  
  logMsg(message): void {
    this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }

}
