import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt"

export async function PUT(request){
    try {
        // Extract the data from submitted form
        const { password, id } = await request.json()

        // Check if the user already exists in the db
        const user = await db.user.findUnique({
            where: {
                id,
            }
        })

        if(!user){
            return NextResponse.json(
                {
                    data: null,
                    message: `User Not Found`
                },
                {
                    status: 404
                }
            )
        }

        // Encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await db.user.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword
            }
        })

        return NextResponse.json(updatedUser)

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update user"
            },
            {
                status: 500
            }
        )
    }
}