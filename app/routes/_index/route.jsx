import { redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session?.shop) {
    return redirect(`/app?shop=${session.shop}`);
  }

  return redirect("/auth/login");
};
