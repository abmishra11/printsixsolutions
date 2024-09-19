import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { token } }) {
    console.log("token:", token);

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: token,
            },
        });
        
        if (!user) {
            return NextResponse.json(
                { message: "You have clicked an invalid email verification link" },
                { status: 404 }
            );
        }

        // Use the prisma transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update emailVerified and status in User
            const updatedUser = await tx.user.update({
                where: {
                    id: token,
                },
                data: {
                    emailVerified: true,
                    status: true,
                },
            });

            // Create a new UserProfile
            const userProfile = await tx.userProfile.create({
                data: {
                    userId: token,
                    name: user.name,
                    email: user.email
                },
            });

            return { updatedUser, userProfile };
        });

        console.log(result.updatedUser, result.userProfile);
        return NextResponse.json(result.updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch user",
                error,
            },
            {
                status: 500,
            }
        );
    }
}
