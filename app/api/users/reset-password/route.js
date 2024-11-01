import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

// Helper function to validate password strength and confirmation
function validatePassword(password, confirmpassword) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        return { message: "Password must include uppercase, lowercase, number, and special character", status: 422 };
    }
    if (password !== confirmpassword) {
        return { message: "Password and confirm password do not match", status: 422 };
    }
    return null;
}

export async function PUT(request) {
    try {
        const { password, confirmpassword, token, id } = await request.json();

        // Password validation
        const passwordError = validatePassword(password, confirmpassword);
        if (passwordError) {
            return NextResponse.json({ data: null, message: passwordError.message }, { status: passwordError.status });
        }

        // Check if user exists and token is valid
        const user = await db.user.findUnique({
            where: { id, passwordResetToken: token, role: "USER" }
        });
        if (!user) {
            return NextResponse.json(
                { data: null, message: "User not found or token invalid." },
                { status: 404 }
            );
        }

        // Check token expiration
        const tokenExpiryDate = new Date(user.passwordResetExpires);
        if (tokenExpiryDate < new Date()) {
            return NextResponse.json(
                { data: null, message: "Token has expired." },
                { status: 410 }  // 410 Gone for expired token
            );
        }

        // Encrypt and update password
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await db.user.update({
            where: { id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null
            },
            select: { id: true, email: true }
        });

        return NextResponse.json(
            { data: updatedUser, message: "Password updated successfully." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message || "Unexpected error" },
            { status: 500 }
        );
    }
}
