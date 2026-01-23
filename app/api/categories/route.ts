import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { spendiApi } from "../api";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const res = await spendiApi("categories", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
