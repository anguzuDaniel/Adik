import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('supabase') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    console.log('🔍 Debugging GqlAuthGuard');
    console.log('Headers:', req.headers);
    console.log('Authorization:', req.headers['authorization']); // Check if token is present

    if (!req.headers['authorization']) {
      console.error('🚨 No Authorization header found!');
    }

    return req;
  }
}
