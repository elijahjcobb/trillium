"use server";

import { ContactFormEmailTemplate } from "#/components/email/contact-form";
import { EMAIL_ADDRESSES, resend } from "#/lib/email";
import { redirect } from "next/navigation";

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

  try {
    const data = await resend.emails.send({
      from: "Trillium Partners Notifications <no-reply@trillium.elijahcobb.app>",
      to: EMAIL_ADDRESSES,
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
