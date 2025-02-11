import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('supabase') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new Error('User not found');
    }

    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    if (!req.headers['authorization']) {
      console.error('🚨 No Authorization header found!');
    }

    return req;
  }
}
