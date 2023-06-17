"use server";

import { redirect } from "next/navigation";

export async function contact(form: FormData): Promise<void> {
  const data = Object.fromEntries(form.entries()) as {
    name: string;
    email: string;
    phone: string;
    goal: string;
    message: string;
  };

  const params = new URLSearchParams();

  const email = `Hey Mom and Aunt Erica!
<br/>
<br/>
Someone with the name <b>${data.name}</b> just submitted their info in the contact form on your website.
<br/>
<br/>
Their phone number is <b>${data.phone}</b> and their email is <b>${data.email}</b>.
<br/>
<br/>
They are interested in: <b>${data.goal}</b>
<br/>
<br/>
They want to say:<br/>
<b>${data.message}</b>
<br/>
<br/>
You can find this contact submission and all others here:<br>
https://docs.google.com/spreadsheets/d/1BaJ_eihBj8CXdK9qBYHXjBf0J8FhpnywpAtW2SOPF74/edit#gid=0
`;

  params.set("value1", `${data.name}`);
  params.set("value2", email);
  params.set(
    "value3",
    `${data.name}|||${data.email}|||${data.phone}|||${data.goal}|||${data.message}`
  );

  await fetch(
    `https://maker.ifttt.com/trigger/ttp-contact/with/key/cwgpkHKqfKfHp48h-Pil36?${params.toString()}`,
    {
      method: "POST",
    }
  );
  redirect("/contact");
}
