import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params: { id }}){
    try {
        const {name, email, phone, dateOfBirth, profileImageUrl} = await request.json()

        const existingUser = await db.userProfile.findUnique({
            where:{
                id,
            }
        })

        if(!existingUser){
            return NextResponse.json(
                {
                    data: null,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        const updatedUser = await db.userProfile.update({
            where: { id },
            data: {
                name, 
                email, 
                phone, 
                dateOfBirth: new Date(dateOfBirth+"T00:00:00Z"), 
                profileImageUrl
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to update user profile",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request, { params: { id } }) {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
            include: {
                profile: true
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