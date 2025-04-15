import nodemailer from "nodemailer";

const mailSender = async (
    from: string,
    to: string,
    subject: string,
    html: string,
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST!,
        secure: true,
        auth: {
            user: process.env.MAIL_USER!,
            pass: process.env.MAIL_PASS!,
        },
    });

    const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
    });

    console.log("Message sent: %s", JSON.stringify(info, null, 2));
};

export default mailSender;
