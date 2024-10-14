import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request, { params: { productid } }) {

    try {
        const reviews = await db.review.findMany({
            where: {
                productId: productid,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Failed to fetch reviews",
                error: error.message
            },
            {
                status: 500
            }
        );
    }
}
