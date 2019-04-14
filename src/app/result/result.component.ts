import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:AppService) { 
    this.dat=new Date();
    this.date=new Date();
  }
  location:string;
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
  error:boolean=false;
  ngOnInit() {
    this.location=this.route.snapshot.params['location'];
    this.service.getLatLon(this.location).subscribe(
      success=>{
        this.lat=success[0].lat;
        this.lon=success[0].lon;
        this.service.getToday(this.lat,this.lon,this.date).subscribe(
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
            this.error=true;
          }
)
      },
      error=>{
        this.error=true;
      }
    )
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
        if (hour>12){
          hour=hour-12;
        }
        
        var temp=arr[2].split(" ")
        if (temp[1]=="AM" ){
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
      ret=Math.ceil(((ms-mr)+((hs-hr)*60))/4)
    }
    else{
      ret=Math.ceil(((60+ms-mr)+((hs-hr-1)*60))/4)
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
