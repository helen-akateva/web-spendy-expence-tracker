import { NextRequest, NextResponse } from "next/server";
import { spendiApi } from "../../api";
import { AxiosError } from "axios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// const BACKEND_URL = process.env.API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, headers } = await spendiApi.post("/auth/register", body);

    const response = NextResponse.json(
      {
        id: data._id || data.id,
        email: data.email,
        name: data.name,
        balance: data.balance ?? 0,
      },
      { status: 201 },
    );

    const cookies = headers["set-cookie"];
    if (cookies) {
      cookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    }

    return response;
  } catch (err) {
    const error = err as AxiosError;
    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { message: "Internal proxy error" };
    return NextResponse.json(data, { status });
  }
}
