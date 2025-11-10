import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AiHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async post<T = any>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await firstValueFrom(
      this.httpService.post(url, data),
    );
    return response.data;
  }
}
