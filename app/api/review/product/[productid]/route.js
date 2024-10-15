import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { productid } }) {

    try {
        // Check if productid is provided
        if (!productid) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        // Fetch reviews, including user and userProfile information, and filter by approval
        const reviews = await db.review.findMany({
            where: {
                productId: productid,
                // isApproved: true,  // Only fetch approved reviews
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,    // Fetch user name from User
                        email: true,   // Fetch user email from User
                        profile: {     // Fetch related UserProfile information
                            select: {
                                phone: true,             // Include phone from UserProfile
                                profileImageUrl: true,   // Include profile image URL from UserProfile
                                dateOfBirth: true,       // Include date of birth from UserProfile
                            }
                        }
                    }
                }
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
