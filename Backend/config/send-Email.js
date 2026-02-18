import { Resend } from "resend";
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.RESEND_API) {
    throw new Error('Provider Resend_api inside the .env file');
}

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const data = await resend.emails.send({
            from: 'Abdur_World<onboarding@resend.dev>',
            to: sendTo,
            subject,
            html,
        });
        console.log('Email send successfully:', data)
        return data

    } catch (error) {
        console.log(error)
    }
}


