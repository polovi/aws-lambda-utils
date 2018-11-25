export declare enum TaskResult {
    Success = "SUCCESS",
    Failed = "FAILED"
}
export interface Message {
    Status: TaskResult;
    ResponseURL: string;
    PhysicalResourceId?: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    Data?: any;
    Reason?: string;
}
export declare const completeTask: (msg: Message) => Promise<{}>;
