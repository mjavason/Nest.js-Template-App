import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterWithAvatarDTO } from './dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Response } from 'express';
import { clearCookieConfig, cookieConfig } from 'src/common/configs/cookie.config';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImages } from 'src/common/configs/multer.config';
import { MulterFile } from 'src/common/interfaces/multer.interface';
import { codeGenerator, generateRandomAvatar } from 'src/common/utils';
import { IDecodedToken } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { BucketService } from 'src/bucket/bucket.service';
import { FRONTEND_URL } from 'src/common/configs';

@Controller('auth')
@ApiTags('Auth')
// @SwaggerResponses()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bucketService: BucketService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Sign up' })
  @UseInterceptors(FileInterceptor('avatar', uploadImages))
  @ApiConsumes('multipart/form-data')
  async register(@UploadedFile() avatar: MulterFile, @Body() body: RegisterWithAvatarDTO) {
    const emailExists = await this.userService.findOne({ email: body.email });
    if (emailExists) throw new ConflictException('Email already exists');

    // if an image was uploaded, set the avatarURL as its path
    if (avatar) {
      const imageUpload = await this.bucketService.uploadToCloudinary(avatar.path);
      body.avatarURL = imageUpload.url;
    }

    // if avatar link has still not been set, both manually or through form upload, generate a default
    if (!body.avatarURL) body.avatarURL = generateRandomAvatar(body.email);

    return await this.authService.register(body);
  }

  @Get('verify-email/:token')
  @ApiOperation({ summary: 'Verify user email address' })
  async verifyEmail(@Param('token') token: string, @Res() res: Response) {
    try {
      const payload: IDecodedToken = await this.jwtService.verifyAsync(token);
      await this.userService.update(payload.sub, {
        isEmailVerified: true,
      });

      // Redirect to the frontend after successful verification
      const redirectUrl = `${FRONTEND_URL}/login`;
      return res.redirect(redirectUrl);
    } catch (error) {
      // Handle any errors, e.g., invalid token
      Logger.error(error.message);
      return res.status(400).send('Invalid or expired token, try logging in to receive a new one');
    }
  }

  @Post('forgot-password/:email')
  @ApiOperation({ summary: 'Request password reset' })
  async forgotPassword(@Param('email') email: string) {
    email = email.toLowerCase();
    return await this.authService.requestForgotPassword(email);
  }

  @Get('reset-password/:token')
  @ApiOperation({ summary: 'Reset user password' })
  async resetPassword(@Param('token') token, @Res() res: Response) {
    try {
      const payload: IDecodedToken = await this.jwtService.verifyAsync(token);
      const randomToken = codeGenerator(7);
      const password = await bcrypt.hash(randomToken, 10);
      await this.userService.update(payload.sub, {
        password,
      });

      return res.status(200).send(`
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding-top: 20px; font-size: 1rem;">
          <p style="font-size: 1.2rem;">Password reset successfully.</p>
          <p style="font-size: 1.1rem;"><strong>${randomToken}</strong> is your new password. Please make sure to change it once you log in.</p>
          <br />
          <p style="font-size: 1rem;">Click <a href="${FRONTEND_URL}" style="color: #007bff; text-decoration: none;">here</a> to return to the home page.</p>
        </div>
      `);
    } catch (e: any) {
      Logger.error(e);
      return res.status(400).send('Forgot password token expired, try again');
    }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in, with cookie sessions that expire in 60 minutes',
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('token', token, cookieConfig);

    return { message: 'Logged in successfully', data: req.user };
  }

  @Delete('logout')
  @ApiOperation({ summary: 'Log out and delete cookie session' })
  @Auth()
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token', clearCookieConfig);

    return {
      message: 'Logged out successfully! Have a nice day',
    };
  }
}
