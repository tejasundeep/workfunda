import nodemailer from 'nodemailer';

export async function executeEmailNode(config, credentials) {
    const { emailHost, emailPort, emailUser, emailPass } = credentials;
    
    if (!emailHost || !emailPort || !emailUser || !emailPass) {
        throw new Error('Email credentials not configured');
    }

    if (!config.to || !config.subject || !config.message) {
        throw new Error('Email configuration incomplete');
    }

    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    try {
        await transporter.sendMail({
            from: emailUser,
            to: config.to,
            subject: config.subject,
            text: config.message,
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
