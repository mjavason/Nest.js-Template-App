import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import Handlebars from 'handlebars';
import { transporter } from 'src/common/configs/mail.config';
import { SendMailDTO, SendWelcomeMailDTO } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly config: ConfigService) {}

  async sendWelcomeMail(mailDetails: SendWelcomeMailDTO) {
    const templatePath = 'src/mail/templates/welcome.html';
    const confirmationLink = `${this.config.get('app.baseURL')}/auth/welcome/${mailDetails.token}`;

    const data = {
      fullName: mailDetails.fullName,
      confirmationLink: confirmationLink,
    };
    const compiledTemplate = await this.renderMailTemplate(templatePath, data);
    if (!compiledTemplate) return false;

    await this.sendMail(mailDetails.email, compiledTemplate, `Welcome`);
    return true;
  }

  async sendSimpleMail(mailDetails: SendMailDTO) {
    const templatePath = 'src/mail/templates/base.html';

    const data = {
      title: mailDetails.title,
      body: mailDetails.body,
      unsubscribeLink: `${this.config.get('app.baseUrl')}/api/v1/newsletter-subscription/unsubscribe/${mailDetails.email}`,
    };

    const compiledTemplate = await this.renderMailTemplate(templatePath, data);
    if (!compiledTemplate) return false;

    await this.sendMail(mailDetails.email, compiledTemplate, mailDetails.title);
    return true;
  }

  async sendMailVerificationEmail(email: string, fullName: string, link: string) {
    const templatePath = 'src/mail/templates/verify_mail.html';
    const data = {
      title: `Email Verification`,
      fullName,
      link,
    };

    const compiledTemplate = await this.renderMailTemplate(templatePath, data);
    if (!compiledTemplate) return false;

    await this.sendMail(email, compiledTemplate, data.title);
    return true;
  }

  async sendForgotPasswordMail(email: string, fullName: string, link: string) {
    const templatePath = 'src/mail/templates/forgot_password.html';
    const data = {
      title: `Forgot Password`,
      fullName,
      link,
    };

    const compiledTemplate = await this.renderMailTemplate(templatePath, data);
    if (!compiledTemplate) return false;

    await this.sendMail(email, compiledTemplate, data.title);
    return true;
  }

  private sendMail = async (recipientEmail: string, mailHtmlBody: string, mailSubject: string) => {
    // This is where the actual email message is built. Things like CC, recipients, attachments, and so on are configured here.
    return await transporter.sendMail({
      from: `Startup <${this.config.get('mail.address')}>`,
      to: recipientEmail,
      subject: mailSubject,
      html: mailHtmlBody,
    });
  };

  private async renderMailTemplate(templatePath: string, data: object) {
    try {
      const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

      const compiledTemplate = Handlebars.compile(emailTemplate);
      return compiledTemplate(data);
    } catch (e: unknown) {
      if (e instanceof Error) Logger.error('Error compiling template', e.message);
      console.log(e);
      return false;
    }
  }
}
