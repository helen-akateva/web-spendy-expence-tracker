import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.BACKEND_API_URL;

async function handleRefresh() {
  const { data, headers } = await axios.post(
    `${BACKEND_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  );

  const response = NextResponse.json(
    {
      id: data._id || data.id,
      email: data.email,
      name: data.name,
      balance: data.balance ?? 0,
    },
    { status: 200 },
  );

  const setCookie = headers["set-cookie"];
  if (setCookie) {
    response.headers.set("set-cookie", setCookie.join(","));
  }

  return response;
}

export async function POST() {
  try {
    return await handleRefresh();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function GET() {
  try {
    return await handleRefresh();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
