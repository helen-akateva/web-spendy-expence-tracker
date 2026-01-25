import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { spendiApi } from "../../api";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Props) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
        const body = await req.json();

        const res = await spendiApi.patch(`/transactions/${id}`, body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
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

export async function DELETE(req: Request, { params }: Props) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;

        const res = await spendiApi.delete(`/transactions/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
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
