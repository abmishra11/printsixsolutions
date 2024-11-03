import { NextResponse } from "next/server"
import db from "@/lib/db";

export async function POST(request){
    try {
        const {rating, comment, productId, userId} = await request.json()
        const newReview = await db.review.create({
            data: {
                rating, comment, productId, userId
            }
        })
        console.log(newReview);
        return NextResponse.json(newReview)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to add new review",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request){
    try {
        const reviews = await db.review.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
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

        const flattenedReviews = reviews.map((review) => ({
            ...review,
            userId: review.user?.id,
            userName: review.user?.name,
            userEmail: review.user?.email,
            productId: review.product?.id,
            productTitle: review.product?.title,
            productPrice: review.product?.productPrice,
            salePrice: review.product?.salePrice,
            productImageUrl: review.product?.imageUrl,
        }));

        return NextResponse.json(flattenedReviews);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch reviews",
                error
            },
            {
                status: 500
            }
        )
    }
}