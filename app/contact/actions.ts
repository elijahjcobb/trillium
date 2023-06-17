"use server";

import { redirect } from "next/navigation";

export async function contact(form: FormData): Promise<void> {
  const data = Object.fromEntries(form.entries());
  console.log({ data });
  const params = new URLSearchParams();

  params.set("value1", `${data.name}`);
  params.set("value2", `${data.email} - ${data.phone}`);
  params.set("value3", `${data.goal} - ${data.message}`);

  await fetch(
    `https://maker.ifttt.com/trigger/ttp-contact/with/key/cwgpkHKqfKfHp48h-Pil36?${params.toString()}}`,
    {
      method: "POST",
    }
  );
  redirect("/contact");
}
