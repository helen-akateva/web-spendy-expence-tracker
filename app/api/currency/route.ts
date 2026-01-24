import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.monobank.ua/bank/currency", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch currency" },
        { status: 500 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
