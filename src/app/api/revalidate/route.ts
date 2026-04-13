import { revalidateTag } from "next/cache";

type Body = { secret: string; tag?: string };

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    if (body.secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    revalidateTag(body.tag ?? "blog", "max");

    return Response.json({ revalidated: true, tag: body.tag ?? "blog" });
  } catch {
    return Response.json({ error: "invalid request" }, { status: 400 });
  }
}
