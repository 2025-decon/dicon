import { HttpException, HttpStatus } from '@nestjs/common';

export class AiErrorHandler {
  static handleError(error: any, defaultMessage: string): never {
    if (error.response) {
      throw new HttpException(
        error.response.data.detail || defaultMessage,
        error.response.status,
      );
    }
    throw new HttpException(
      'AI 서버와 통신 중 오류가 발생했습니다.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
