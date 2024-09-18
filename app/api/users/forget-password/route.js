import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import EmailTemplate from "@/components/Email-Template";

export async function PUT(request){
    try {
        // Extract the data from submitted form
        const { email } = await request.json()

        // Check if the user already exists in the db
        const existingUser = await db.user.findUnique({
            where: {
                email,
            }
        })

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

        /** Generate Token **/
        // Generate a random UUID (Version 4)
        const rawToken = uuidv4()
        console.log(rawToken);

        // Encode the token using Base64 URL-Safe format
        const token = base64url.encode(rawToken)

        // Update a user in the DB
        // const updatedUser = await db.user.update({
        //     where: {
        //         email,
        //     },
        //     data: {
        //         passwordResetToken: token
        //     }
        // })

        // Send an Email with the token on the link as a search param
        const linkText = "Reset Password"
        const userId = existingUser.id
        const name = existingUser.name
        const redirectUrl = `reset-password?token=${token}&id=${userId}`
        const description = "Click on the following link in order to reset your password. Thank you"
        const subject = "Password Reset"
        console.log(userId, name, redirectUrl, description, subject);

        /* Send the Email */
        // Write send email login here
        console.log(token);
        return NextResponse.json(
            {
                data: null,
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