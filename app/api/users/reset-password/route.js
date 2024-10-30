import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function PUT(request) {
    try {
        // Extract the data from the request body
        const { password, confirmpassword, token, id } = await request.json();

        if (password !== confirmpassword) {
            return NextResponse.json(
                { data: null, message: "Passwords do not match." },
                { status: 400 }
            );
        }

        // Fetch the user based on ID, token, and role
        const user = await db.user.findUnique({
            where: {
                id,
                passwordResetToken: token,
                role: "USER"
            }
        });

        if (!user) {
            return NextResponse.json(
                { data: null, message: "User not found or token invalid." },
                { status: 404 }
            );
        }

        // Check if the token has expired
        const tokenExpiryDate = new Date(user.passwordResetExpires);
        if (tokenExpiryDate < new Date()) {
            return NextResponse.json(
                { data: null, message: "Token has expired." },
                { status: 400 }
            );
        }

        // Encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password and remove the token fields
        const updatedUser = await db.user.update({
            where: { id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null
            },
            select: { id: true, email: true }  // Ensure only non-sensitive fields are returned
        });

        return NextResponse.json(
            { data: updatedUser, message: "Password updated successfully." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error", message: "Failed to update user" },
            { status: 500 }
        );
    }
}
