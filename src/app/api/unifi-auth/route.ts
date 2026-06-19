import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if ("status" in body) {
    return NextResponse.json({ meta: { rc: "ok" }, data: [] });
  }

  if ("auth" in body) {
    const { sitioid, macid, tiempo } = body.auth;

    if (!sitioid || !macid) {
      return NextResponse.json(
        {
          meta: { rc: "error", msg: "api.err.Invalid" },
          data: [],
        },
        { status: 400 }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const durationMinutes = tiempo ? parseInt(tiempo, 10) : 60;
    const end = now + durationMinutes * 60;

    console.log(`[Mock UniFi] Authorizing device:`);
    console.log(`  Site:     ${sitioid}`);
    console.log(`  MAC:      ${macid}`);
    console.log(`  Duration: ${durationMinutes} min`);
    console.log(`  Valid until: ${new Date(end * 1000).toISOString()}`);

    return NextResponse.json({
      meta: { rc: "ok" },
      data: [
        {
          authorized_by: "api",
          start: now,
          site_id: "mock_site_" + sitioid,
          end,
          _id: "mock_" + Date.now(),
          mac: macid,
        },
      ],
    });
  }

  return NextResponse.json(
    {
      meta: { rc: "error", msg: "api.err.Invalid" },
      data: [],
    },
    { status: 400 }
  );
}