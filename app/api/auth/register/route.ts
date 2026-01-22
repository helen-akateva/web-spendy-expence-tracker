import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, headers } = await axios.post(
      `${BACKEND_URL}/auth/register`,
      body,
      { withCredentials: true },
    );

    const response = NextResponse.json(
      {
        id: data._id || data.id,
        email: data.email,
        name: data.name,
        balance: data.balance ?? 0,
      },
      { status: 201 },
    );

    const setCookie = headers["set-cookie"];
    if (setCookie) {
      response.headers.set("set-cookie", setCookie.join(","));
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ||
            error.message ||
            "Registration failed",
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
