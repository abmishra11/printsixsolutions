import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params: { id }}){
    try {
        const { reviewStatus } = await request.json()
        const existingReview = await db.review.findUnique({
            where:{
                id,
            }
        })
        if(!existingReview){
            return NextResponse.json(
                {
                    data: null,
                    message: "Review not found"
                },
                {
                    status: 404
                }
            )
        }

        const updateReview = await db.review.update({
            where: { id },
            data: {isApproved: JSON.parse(reviewStatus)}
        })

        return NextResponse.json(updateReview)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to change review status",
                error
            },
            {
                status: 500
            }
        )
    }
}