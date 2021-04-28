interface IParamType {
    detectKeys: Array<string | number>;
    keyevent: string;
}
declare const useKey: (callback: (currentKeyCode: number, event: Event) => unknown, { detectKeys, keyevent }?: IParamType, { dependencies }?: {
    dependencies?: never[] | undefined;
}) => any;
export { useKey };
