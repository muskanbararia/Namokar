import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appService:AppService,private cd: ChangeDetectorRef,protected elementRef: ElementRef) { 
    this.dat=new Date();
    this.date=new Date();
  }
  lat:any;
  lon:any;
  sunrise:any;
  sunset:any;
  navkarsi:any;
  porsi:any;
  doporsi:any;
  dat:Date;
  date:Date;
  da:any;
  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.lat = position.coords.latitude,
              this.lon = position.coords.longitude
              //alert(this.lat);
              this.appService.getToday(this.lat,this.lon,this.date).subscribe(
                success=>{
                  this.sunrise=success.results.sunrise;
                  this.sunrise=this.add(this.sunrise,5,30);
                  this.sunset=success.results.sunset;
                  this.sunset=this.add(this.sunset,5,30)
                  this.navkarsi=this.add(this.sunrise,0,48);
                  var temp=this.timetoadd(this.sunrise,this.sunset)
                  this.porsi=this.add(this.sunrise,0,temp)
                  this.doporsi=this.add(this.sunrise,0,2*temp)
                },
                error=>{
                  alert("Sorry")
                }
      )
          },
          error => {
            
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
              this.lat=28.7041;
              this.lon=77.1025;
              this.appService.getToday(this.lat,this.lon,this.date).subscribe(
                success=>{
                  this.sunrise=success.results.sunrise;
                  this.sunrise=this.add(this.sunrise,5,30);
                  this.sunset=success.results.sunset;
                  this.sunset=this.add(this.sunset,5,30)
                  this.navkarsi=this.add(this.sunrise,0,48);
                  var temp=this.timetoadd(this.sunrise,this.sunset)
                  this.porsi=this.add(this.sunrise,0,temp)
                  this.doporsi=this.add(this.sunrise,0,2*temp)
                },
                error=>{
                  alert("Sorry")
                }
      )
          }
      );
  };
  
  }
  add(time,hh,mm){
    var arr=time.split(":")
    var mins=parseInt(arr[1])
    var hour=parseInt(arr[0])
    var old=mins
    if (hour==12){
      hour=0
    }
    if (mins+mm<60){
      mins+=mm
      hour+=hh
    }
    else{
      mins=((mm+mins)%60)
      
      var s=Math.floor((mm+old)/60)
      hour+=hh+s
      if (hour>=12){
        hour=hour-12;
        var temp=arr[2].split(" ")
        if (temp[1]=="AM"){
          temp[1]="PM"
        }
        else{
          temp[1]="AM"
        }
        arr[2]=temp[0]+" "+temp[1]
      }
    }
    return hour+':'+mins+':'+arr[2]
  }

  timetoadd(sunrise,sunset){
    var rise=sunrise.split(":")
    var set=sunset.split(":")
    var hr=parseInt(rise[0])
    var mr=parseInt(rise[1])
    var hs=parseInt(set[0])+12
    var ms=parseInt(set[1])
    
    var ret=0
    if (ms-mr>=0){
      ret=Math.floor(((ms-mr)+((hs-hr)*60))/4)
    }
    else{
      ret=Math.floor((60+ms-mr)+((hs-hr-1)*60)/4)
    }
    return ret;
  }
  dateminus(){
    this.date=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate()-1)
    this.ngOnInit();

  }
  dateadd(){
    this.date=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate()+1)
    this.ngOnInit();
  }
  
dC(){
  var temp=this.da.split("-")
  
  if (temp[0]=="yyyy" || temp==null ||temp==''){
    this.date=new Date();
  }
  else{

    this.date=new Date(temp[0],temp[1],temp[2])
  }
  this.ngOnInit();
}
}
