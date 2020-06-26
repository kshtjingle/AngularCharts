import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import {ChartsModule} from 'ng2-charts';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { FormsModule } from "@angular/forms";


import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";

//import {MatTableModule} from '@angular/material/table';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  //connectOnCreate: false,
  hostname: 'broker.hivemq.com',
  port: 8000,
  /*username: 'esp',
  password: 'ptlesp01',*/
  path: '/mqtt'
  
}

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartComponent,
    TableComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule
    //MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
