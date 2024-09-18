import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params: { id }}){
    try {

        const existingUser = await db.user.findUnique({
            where:{
                id,
            }
        })
        console.log(existingUser);
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
        const status = !existingUser.status;
        const updatedUser = await db.user.update({
            where: { id },
            data: { status }
        })

        console.log(updatedUser);
        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to update user status",
                error
            },
            {
                status: 500
            }
        )
    }
}