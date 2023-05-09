import { Body, Controller, Get, OnModuleInit, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { ApiCookieAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginRequestDto } from "./dtos/login-request.dto";
import { AuthService } from "./services/auth.service";
import { LocalAuthGuard } from "./services/local.strategy";
import { JwtAuthGuard } from "./services/jwt.strategy";

@ApiTags('Auth')
@Controller('')
export class AuthController implements OnModuleInit {

    constructor(
        private readonly authService: AuthService,

    ) { }

    @ApiResponse({
        status: 200,
        description: "This api will login user with username and password",
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async postLogin(@Body() dto: LoginRequestDto, @Request() request, @Res({ passthrough: true }) res: Response) {

        const { access_token } = await this.authService.login(request.user);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({ status: 'ok' });
    }


    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {

            res.cookie('access_token', '', {
                expires: new Date(),
            }).send({ status: 'ok' })
    }


    onModuleInit() {

        this.authService.registerUser()

    }
}