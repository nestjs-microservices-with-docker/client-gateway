import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError();
    const message = exception.message;

    if(error.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: 'There are no listeners for this service',
      })
    }
    
    if (typeof error === 'object' && 'status' in error && 'message' in error) {
      const status = isNaN(+error.status) ? 500 : +error.status;
      return response.status(status).json(error);
    }
    response.status(400).json({
      status: 400,
      message,
      error,
    });
  }
}
