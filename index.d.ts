

export interface RVOption {
    template: string,
    style: string,
    props: string,
    name?: string,
    data: object,
    methods?: object,
    run(): void,
    onDomChange(paramObj: any): void,
    watch?: object,
    onMount(): void?,
}
export interface RvRouteConfig {
    path: string,
    component: RvComponent,
    param?: string,
    ismain: boolean
}

declare class RvComponent {
    constructor(componentParam: RVOption, ismain: boolean)
    use(component: RvComponent): void
}
declare class RV extends RvComponent {
    constructor(el: string, componentParam: RVOption)
    route(routeConfig: Array[RvRouteConfig]): void
    static component(option: RVOption): void
    run(callback?: (rv: RV) => void): void

}
export default RV