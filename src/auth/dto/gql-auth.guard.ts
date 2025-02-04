import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('supabase') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log('Headers:', ctx.getContext().req.headers); // Debugging
    console.log('Authorization:', ctx.getContext().req.headers['authorization']); // 🔥 Log this
    return ctx.getContext().req;
  }
}
