import { request as makeRequest } from 'https'
import { parse as parseUrl } from 'url'

export enum Status {
  Succes = 'Success',
  Failed = 'FAILED',
}

const sendMessage = (msg: {
  Status: Status
  StackId: string
  RequestId: string
  ResponseURL: string
  LogicalResourceId: string
  PhysicalResourceId: string
  Data?: object
  Reason?: string
}): Promise<void> => {
  const { hostname, path } = parseUrl(msg.ResponseURL)
  const body: string = JSON.stringify(msg)

  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'PUT',
      headers: { 'content-length': body.length },
    }

    const req = makeRequest(options, res => {
      res.on('end', resolve)
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

export const fromEvent = (event: {
  StackId: string
  RequestId: string
  ResponseURL: string
  LogicalResourceId: string
  PhysicalResourceId?: string
}) => ({
  complete: (status: Status, data?: object, reason?: string): Promise<void> =>
    sendMessage({
      Status: status,
      StackId: event.StackId,
      RequestId: event.RequestId,
      ResponseURL: event.ResponseURL,
      LogicalResourceId: event.LogicalResourceId,
      PhysicalResourceId: event.PhysicalResourceId || event.LogicalResourceId,
      Data: data,
      Reason: reason,
    }),
})
