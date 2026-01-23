import { NextResponse } from "next/server";
import { spendiApi } from "../../api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// const BACKEND_URL = process.env.API_BASE_URL;

export async function POST() {
  try {
    const { data, headers } = await spendiApi.post("/auth/refresh", {});

    const response = NextResponse.json(
      {
        id: data._id || data.id,
        email: data.email,
        name: data.name,
        balance: data.balance ?? 0,
      },
      { status: 200 },
    );

    const cookies = headers["set-cookie"];
    if (cookies) {
      cookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    }

    return response;
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
