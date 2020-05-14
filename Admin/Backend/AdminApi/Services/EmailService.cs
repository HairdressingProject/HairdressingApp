using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;

namespace AdminApi.Services
{
    public interface IEmailService
    {
        void SendEmail(string toEmail, string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string toEmail, string to, string subject, string body)
        {
            var adminUsername = _configuration["Admin:Username"];
            var adminEmail = _configuration["Admin:Email"];
            var adminPassword = _configuration["Admin:Password"];

            Console.WriteLine("Sending email...");
            Console.WriteLine(adminUsername);
            Console.WriteLine(adminEmail);
            Console.WriteLine(adminPassword);

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(adminUsername, adminEmail));
            message.To.Add(new MailboxAddress(to, toEmail));

            message.Subject = subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
            {
                Text = body
            };

            try
            {
                using var client = new SmtpClient();
                client.Connect("smtp.yandex.com", 587, SecureSocketOptions.Auto);

                client.Authenticate(adminEmail, adminPassword);

                client.Send(message);
                client.Disconnect(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
