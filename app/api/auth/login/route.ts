import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { spendiApi } from "../../api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await spendiApi.post("/auth/login", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path ?? "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }

        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        if (parsed.sessionId) {
          cookieStore.set("sessionId", parsed.sessionId, options);
        }
      }

      return NextResponse.json(apiRes.data, {
        status: 200,
      });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 },
        );
      }

      if (status === 400) {
        return NextResponse.json(
          { message: "Please check your email and password format" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          message: "Something went wrong. Please try again.",
        },
        { status: status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
