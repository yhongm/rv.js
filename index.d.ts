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
  onMount(): ?void;
}
export interface YrvRouteConfig {
  path: string;
  component: RvComponent;
  param?: string;
  ismain: boolean;
}

export interface YrvEvent {
  name: string;
  value: any;
  componentName: string;
}
export interface RouteInfo {
  path: string;
  paramObj: any;
}
declare class YrvComponent {
  constructor(componentParam: YrvOption, ismain: boolean);
  use(component: YrvComponent): void;
  $sendEvent(event: YrvEvent): void;
  $routeChange(routeInfo: RouteInfo): void;
}
declare class RV extends YrvComponent {
  constructor(el: string, componentParam: YrvOption);
  route(routeConfig: Array[YrvRouteConfig]): void;
  static component(option: YrvOption): YrvComponent;
  run(callback: (rv: RV) => {}): void;
}
export default RV;
