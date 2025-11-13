import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EntrySerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((entry) => this.serializeEntry(entry));
        }
        return this.serializeEntry(data);
      }),
    );
  }

  private serializeEntry(entry: any) {
    if (!entry) return entry;
    
    return {
      ...entry,
      data: entry.data
        ? new Date(entry.data).toISOString().split('T')[0]
        : entry.data,
    };
  }
}

