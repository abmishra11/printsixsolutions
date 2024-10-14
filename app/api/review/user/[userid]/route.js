import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params: { userid }}){
    try {
        const review = await db.review.findUnique({
            where: {
                userId:userid,
            },
        })

        return NextResponse.json(review)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                
            }
        )
    }
}