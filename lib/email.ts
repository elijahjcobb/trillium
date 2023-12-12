import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const emailString = process.env.NOTIFICATION_EMAILS as string;
export const EMAIL_ADDRESSES = emailString.split(",").map((e) => e.trim());
