import {Component} from '@angular/core';

// 通过注解的方式描述清楚了这个视图组件所需的模版、样式、数据、逻辑。
@Component({
  // 标签名称
  selector: 'app-root',
  // HTML 模版
  template: '<h1>{{msg}}</h1>',
  // CSS 样式
  styles: ['h1{ color:red; }']
})
export class AppComponent {
  msg = 'Hello,Webpack';
}
