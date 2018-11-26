export declare enum Status {
    Succes = "SUCCESS",
    Failed = "FAILED"
}
export declare const fromEvent: (event: {
    StackId: string;
    RequestId: string;
    ResponseURL: string;
    LogicalResourceId: string;
    PhysicalResourceId?: string | undefined;
}) => {
    complete: (status: Status, data?: object | undefined, reason?: string | undefined) => Promise<void>;
};
