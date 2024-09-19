import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        /*
            code, 
            contactPerson, 
            contactPersonPhone, 
            email, 
            name, 
            notes, 
            phone, 
            physicalAddress, 
            terms, 
            isActive, 
            profileImageUrl, 
            products,
            userId  
         */

        // Update the email verification in the user collection
        const {
            code, 
            contactPerson, 
            contactPersonPhone, 
            email, 
            name, 
            notes, 
            phone, 
            physicalAddress, 
            terms, 
            isActive, 
            profileImageUrl, 
            products,
            userId
        } = await request.json()

        // Check if the user already exists
        const existingUser = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!existingUser){
            return NextResponse.json(
                {
                    data: null,
                    message: `No user found`
                },
                {
                    status: 404
                }
            )
        }

        // Update emailVerified
        const updatedUser = await db.user.update({
            where: {
                id: userId
            },
            data: {
                emailVerified: true
            }
        })

        const newVendorProfile = await db.vendorProfile.create({
            data: {
                code: code,
                contactPerson: contactPerson,
                contactPersonPhone: contactPersonPhone,
                profileImageUrl: profileImageUrl,
                email: email,
                name: name,
                notes: notes,
                phone: phone,
                physicalAddress: physicalAddress,
                terms: terms,
                isActive: isActive,
                products: products,
                userId: userId
            }
        })

        console.log(newVendorProfile);
        return NextResponse.json(newVendorProfile)
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
        const vendors = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                role: "VENDOR"
            },
            include: {
                vendorProfile: true
            }
        })
        return NextResponse.json(vendors)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch vendors"
            },
            {
                status: 500
            }
        )
    }
}