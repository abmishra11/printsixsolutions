import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(request, { params: { id } }) {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                email: true,
                name: true,
                id: true,
                role: true,
                createdAt: true,
                profile: true,
                emailVerified: true,
                status: true
            }
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch user",
                error
            },
            {
                status: 500
            }
        );
    }
}
    