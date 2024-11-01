import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import base64url from "base64url"

function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        return { message: "Password must include uppercase, lowercase, number, and special character", status: 422 };
    }

    return null;
}

export async function POST(request){
    try {
        const {name, email, password, role, plan} = await request.json()

        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return NextResponse.json(
                {
                    data: null,
                    message: "User already exists"
                },
                {
                    status: 409
                }
            )
        }

        // Password validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            return NextResponse.json({ data: null, message: passwordError.message }, { status: passwordError.status });
        }

        // Encrypt the password => bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // Generate a random UUID (version 4)
        const rawToken = uuidv4()
        // Encode the token using Base64 URL-safe format
        const token = base64url.encode(rawToken)

        const newUser = await db.user.create({
            data: {
                name, 
                email, 
                password: hashedPassword,
                role,
                plan,
                verificationToken: token
            }
        })

        console.log(newUser);

        // Send the email if the user role == VENDOR
        if(role === "VENDOR"){
            // Write logic for sending the email
            const userId = newUser.id
            const linkText = "Verify Account"
            const redirectUrl = `onboarding/${userId}?token=${token}`
            console.log(redirectUrl);

            //const sendEmail = sendEmailFunction()
        }

        return NextResponse.json({
            data: newUser,
            message: "User Created Successfully"
        },{
            status: 201
        })
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

export async function GET(request){
    try {
        const users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch users",
                error
            },
            {
                status: 500
            }
        )
    }
}