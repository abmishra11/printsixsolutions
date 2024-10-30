import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import EmailTemplate from "@/components/Email-Template";

export async function PUT(request){
    try {
        // Extract the data from submitted form
        const { email } = await request.json()
        console.log("email", email);
        
        // Check if the user already exists in the db
        const existingUser = await db.user.findUnique({
            where: {
                email,
            }
        })
        console.log("existingUser", existingUser);
        if(!existingUser){
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

        // Generate Token
        // Generate a random UUID (Version 4)
        const rawToken = uuidv4()
        console.log("rawToken", rawToken);

        // Encode the token using Base64 URL-Safe format
        const token = base64url.encode(rawToken)

        const tokenExpiry = new Date(Date.now() + 5 * 60 * 1000);
        // update a user in the DB
        const updatedUser = await db.user.update({
            where: {
                email,
            },
            data: {
                passwordResetToken: token,
                passwordResetExpires: tokenExpiry
            }
        })

        console.log("updatedUser", updatedUser);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const redirectUrl = `${baseUrl}/reset-password?token=${token}&id=${existingUser?.id}`
        // const description = "Click on the following link in order to reset your password. Thank you"

        /* Send the Email */
        // Write send email login here
        console.log(token);
        return NextResponse.json(
            {
                data: {
                    email:  existingUser?.email,
                    redirectUrl: redirectUrl
                },
                message: "User Updated Successfully"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Server Error: Something went wrong"
            },
            {
                status: 500
            }
        )
    }
}