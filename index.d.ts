export interface YrvOption {
  name?: string;
  template: string;
  style: string;
  props: object;
  data: object;
  methods?: object;
  watch?: object;
  onRun(): void;
  onDomChange(paramObj: any): void;
  onMount(): void;
  onUnMount():void;
  onInit();void;
}
export interface YrvRouteConfig {
  path: string;
  component: YrvComponent;
  param?: string;
  ismain: boolean;
}

export interface YrvEvent {
  name: string;
  value: any;
}
export interface RouteInfo {
  path: string;
  paramObj: any;
}
declare class YrvComponent {
  constructor(componentParam: YrvOption, ismain: boolean);
  use(component: YrvComponent ,key?:string): void;
  $sendEvent(event: YrvEvent): void;
  $routeChange(routeInfo: RouteInfo,componentName?:string): void;
  $onEvent(event:string,callback:((value: ) => {}))
  route(routeConfig: Array<YrvRouteConfig>): void;
  getParentComponentName(): string;
  getComponentUniqueTag(): string;
}
declare class RV extends YrvComponent {
  constructor(el: string, componentParam: YrvOption);
  static component(option: YrvOption): YrvComponent;
  run(callback: (rv: RV) => {}): void;
}
export default RV;
