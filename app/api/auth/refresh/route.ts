import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export const runtime = "nodejs";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const { data, headers } = await axios.post(
      `${BACKEND_URL}/auth/refresh`,
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
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
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
