import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params: { id }}){
    try {
        const review = await db.review.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    select: {
                        name: true, 
                        email: true,  
                        profile: {   
                            select: {
                                phone: true,             
                                profileImageUrl: true,   
                                dateOfBirth: true,       
                            }
                        }
                    }
                },
                product: {
                    select: {
                        id: true,
                        title: true,
                        productPrice: true,
                        salePrice: true,
                        imageUrl: true,
                    },
                },
            }
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

export async function DELETE(request, {params: { id }}){
    try {
        const existingReview = await db.review.findUnique({
            where: {
                id,
            },
        })

        if(!existingReview){
            return NextResponse.json({
                data: null,
                message: "Review not found"
            }, {status: 404})
        }

        const deletedReview = await db.review.delete({
            where: {
                id,
            },
        })

        return NextResponse.json(deletedReview)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete review",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function PUT(request, {params: { id }}){
    try {
        const {rating, comment, productId, userId} = await request.json()

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
            data: {rating, comment, productId, userId}
        })

        console.log(updateReview);
        return NextResponse.json(updateReview)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to update review",
                error
            },
            {
                status: 500
            }
        )
    }
}