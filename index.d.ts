

export interface RVOption {
    name?: string,
    template: string,
    style: string,
    props: object,
    data: object,
    methods?: object,
    watch?: object,
    onRun(): void,
    onDomChange(paramObj: any): void,
    onMount(): void?,
}
export interface RvRouteConfig {
    path: string,
    component: RvComponent,
    param?: string,
    ismain: boolean
}

export interface RvEvent {
    name: string,
    value: any,
    componentName: string
}

declare class RvComponent {
    constructor(componentParam: RVOption, ismain: boolean)
    use(component: RvComponent): void
    $sendEvent(event: RvEvent): void
}
declare class RV extends RvComponent {
    constructor(el: string, componentParam: RVOption)
    route(routeConfig: Array[RvRouteConfig]): void
    static component(option: RVOption): RvComponent
    run(callback: (RV) => {}): void

}
export default RV