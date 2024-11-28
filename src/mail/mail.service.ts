import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import fs from 'fs';
import { transporter } from 'src/common/configs/mail.config';
import { SendMailDTO, SendWelcomeMailDTO } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly config: ConfigService) {}

  async sendWelcomeMail(mailDetails: SendWelcomeMailDTO) {
    // Load the email template
    const templatePath = 'src/mail/templates/welcome.html';
    const confirmationLink = `${this.config.get('app.baseURL')}/auth/welcome/${mailDetails.token}`;

    // Compile the template
    const data = {
      fullName: mailDetails.fullName,
      confirmationLink: confirmationLink,
    };
    const compiledTemplate = await this.renderMailTemplate(templatePath, data);
    if (!compiledTemplate) return false;

    // Send the email
    await this.sendMail(mailDetails.email, compiledTemplate, `Welcome`);
    return true;
  }

  async sendSimpleMail(mailDetails: SendMailDTO) {
    // Load the email template
    const templatePath = 'src/mail/templates/base.html';

    // Replace placeholders with actual data
    const data = {
      title: mailDetails.title,
      body: mailDetails.body,
      unsubscribeLink: `${this.config.get('app.baseUrl')}/api/v1/newsletter-subscription/unsubscribe/${mailDetails.email}`,
    };
    // Compile the template
    const compiledTemplate = await this.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    await this.sendMail(mailDetails.email, compiledTemplate, mailDetails.title);

    return true;
  }

  async sendMailVerificationEmail(email: string, fullName: string, link: string) {
    // Load the email template
    const templatePath = 'src/mail/templates/verify_mail.html';

    // Replace placeholders with actual data
    const data = {
      title: `Email Verification`,
      fullName,
      link,
    };
    // Compile the template
    const compiledTemplate = await this.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    await this.sendMail(email, compiledTemplate, data.title);

    return true;
  }

  async sendForgotPasswordMail(email: string, fullName: string, link: string) {
    // Load the email template
    const templatePath = 'src/mail/templates/forgot_password.html';

    // Replace placeholders with actual data
    const data = {
      title: `Forgot Password`,
      fullName,
      link,
    };
    // Compile the template
    const compiledTemplate = await this.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    await this.sendMail(email, compiledTemplate, data.title);

    return true;
  }

  // async sendNewsletterToAllSubscribers(newsletterTitle: string, newsletterBody: string) {
  //   const newsletterSubscriptionService = new GeneralSoftService(NewsLetterSubscriptionModel);
  //   const allUsers = await newsletterSubscriptionService.find({});

  //   if (allUsers.length == 0) {
  //     winstonLogger.info('No newsletter subscription found');
  //     return;
  //   }

  //   for (const user of allUsers) {
  //     const data = {
  //       title: newsletterTitle,
  //       body: newsletterBody,
  //       unsubscribeLink: `${SITE_LINK}/api/v1/newsletter-subscription/unsubscribe/${user.id}`,
  //     };
  //     const templatePath = 'src/mail/templates/base.html';
  //     const compiledTemplate = await renderMailTemplate(templatePath, data);

  //     if (compiledTemplate) {
  //       await mailService.sendMail(user.email, compiledTemplate, newsletterTitle);
  //       winstonLogger.info(`Mail sent successfully to ${user.email}`);
  //     }
  //   }
  // }

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
      // Load the email template
      // const templatePath = './email-templates/welcome-email.html';
      const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

      // Compile the template
      const compiledTemplate = Handlebars.compile(emailTemplate);
      return compiledTemplate(data);
    } catch (e: unknown) {
      if (e instanceof Error) Logger.error('Error compiling template', e.message);
      console.log(e);
      return false;
    }
  }
}
