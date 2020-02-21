import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

const MailerRegister = MailerModule.forRoot({
  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
});

export { MailerRegister };
