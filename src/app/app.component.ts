import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import {FormControl} from '@angular/forms';
// import PlainDraggable from 'plain-draggable';
declare const PlainDraggable: any;
declare const LeaderLine: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit, OnDestroy {

  input = [
    'inject' ,'catch','mqtt','http','websocket','tcp','udp','serial'
  ]

  output = [
    'inject' ,'catch','mqtt'
  ]

  function = [
    'function','exec'
  ]
 
  social = [
    'catch','mqtt','http','websocket','tcp','udp'
  ]

  storage = [
    'websocket','tcp','udp','serial'
  ]

  analysis = [
    'inject' ,'catch','udp','serial'
  ]

  advanced = [
    'http','websocket','tcp','udp','serial'
  ]

  nameofthefillernode : string = ''

  nameoftheitem(item:string)
  {
    this.nameofthefillernode = item
  }

  tabs = ['flow-1'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('Flow-'+ this.tabs.length);

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  @ViewChild('container', { static: true })
  public container: any;

  @ViewChild('draggable1', { static: true })
  public handle1: any;
  @ViewChild('draggable2', { static: true })
  public handle2: any;

//  @ViewChild('leaderline1', { static: true })
//  public handle4: any;


  public ngOnInit(): void {
    const container = this.container.nativeElement;
    const handle1 = this.handle1.nativeElement;
    const handle2 = this.handle2.nativeElement;

    const options = {
      containment: container,
    };


    function init() {
      try {
        const d1 = new PlainDraggable(handle1, {onMove: fixLine} );
        const d2 = new PlainDraggable(handle2, {onMove: fixLine} );

        const l1 = new LeaderLine(LeaderLine.mouseHoverAnchor(handle1), handle2);

        function fixLine() {
               l1.position();
        }

      }
      catch (error) {
        setTimeout(init, 200);
      }
    }
    init();
  }

  public ngOnDestroy(): void {}
}
