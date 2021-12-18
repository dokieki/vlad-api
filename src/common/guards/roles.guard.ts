import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from '../../entities';
import { UsersService } from '../../controllers/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly usersService: UsersService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        
        console.log(roles);

        if (!roles) return true;

        const request = context.switchToHttp().getRequest();

        const auth = request.query.key;


        if (!auth) return false;
        
        const user = await this.validate(auth);

        if (!user) return false;
        if (!roles.includes(user.role) && user.role !== 'admin') return false;

        request.user = user;

        return true;
    }

    validate(key: string): Promise<UserEntity> {
        return this.usersService.findOne({
            key
        });
    }
}