import { PrismaService } from './../prisma/prisma.service';
import { Body, Controller, ParseIntPipe, Post, Get } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth') 
export class AuthController  {
    constructor(private authService: AuthService, private prisma: PrismaService) {}

    @Post('signup') 
    signup(@Body() dto: AuthDto) {  
        return this.authService.signup(dto);
    }   

    @Post('signin')
    signin(@Body() dto: AuthDto) { 
        return this.authService.signin(dto);
    }
}