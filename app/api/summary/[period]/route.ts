import { NextResponse } from "next/server";
import { spendyApi } from "../../api";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { period: string } },
) {
  const cookieStore = await cookies();
  const { period } = await params;
  console.log("Proxy GET /summary/", period);
  try {
    const response = await spendyApi.get(`/summary/${period}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    const error = err as AxiosError;
    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { message: "Internal proxy error" };

    return NextResponse.json(data, { status });
  }
}
