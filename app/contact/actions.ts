"use server";

import { ContactFormEmailTemplate } from "#/components/email/contact-form";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function contact(form: FormData): Promise<void> {
  const { name, email, phone, goal, message } = Object.fromEntries(
    form.entries()
  ) as {
    name: string;
    email: string;
    phone: string;
    goal: string;
    message: string;
  };

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const emailString = process.env.NOTIFICATION_EMAILS as string;
    const emails = emailString.split(",").map((e) => e.trim());
    const data = await resend.emails.send({
      from: "Trillium Partners Notifications <no-reply@trillium.elijahcobb.app>",
      to: emails,
      subject: "New Contact Form Submission",
      react: ContactFormEmailTemplate({
        name,
        email,
        phone,
        goal,
        message,
      }),
    });
    console.log(data);
  } catch (error) {
    console.error("Error sending email");
    console.error(error);
  } finally {
    redirect("/contact/thank-you");
  }
}
