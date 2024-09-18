import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id }}){
    try {
        const vendor = await db.user.findUnique({
            where: {
                id,
            },
            include: {
                vendorProfile: true,
            },
        })
        return NextResponse.json(vendor)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch vendor",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(request, { params: { id }}){
    try {
        const existingVendor = await db.user.findUnique({
            where: {
                id,
            },
        })

        if(!existingVendor){
            return NextResponse.json(
                {
                    data: null,
                    message: "Vendor not found"
                },
                {
                    status: 500
                }
            )
        }

        const deleteVendor = await db.user.delete({
            where: {
                id,
            }
        })

        return NextResponse.json(deleteVendor)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete vendor",
                error,
            },
            {
                status: 500
            }
        )
    }
}

export async function PUT(request, {params: { id }}){
    try {
        const { status, emailVerified } = await request.json()
        const existingVendor = await db.user.findUnique({
            where:{
                id,
            }
        })
        console.log("Vendor detail", existingVendor);
        if(!existingVendor){
            return NextResponse.json(
                {
                    data: null,
                    message: "Vendor not found"
                },
                {
                    status: 404
                }
            )
        }

        const updateVendor = await db.user.update({
            where: { id },
            data: {status, emailVerified}
        })

        console.log(updateVendor);
        return NextResponse.json(updateVendor)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to change vendor status",
                error
            },
            {
                status: 500
            }
        )
    }
}