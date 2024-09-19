import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const address = await db.address.findUnique({
            where: {
                id
            },
        });
        if (!address) {
            return NextResponse.json(
                { message: "Address not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(address);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch address",
                error
            },
            {
                status: 500
            }
        );
    }
}

export async function DELETE(request, {params: { id }}){
    try {
        const existingAddress = await db.address.findUnique({
            where: {
                id,
            },
        })

        if(!existingAddress){
            return NextResponse.json({
                data: null,
                message: "Address not found"
            }, {status: 404})
        }

        const deletedAddress = await db.address.delete({
            where: {
                id,
            },
        })

        return NextResponse.json(deletedAddress)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete address",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function PUT(request, { params: { id } }) {
    try {
        const {
            userId,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
            defaultBilling,
            defaultShipping
        } = await request.json();


        const existingAddress = await db.address.findUnique({
            where: {
                id,
            }
        });

        if (!existingAddress) {
            return NextResponse.json(
                {
                    data: null,
                    message: "Address not found"
                },
                {
                    status: 404
                }
            );
        }

        // Check if either defaultBilling or defaultShipping is true
        if (defaultBilling || defaultShipping) {
            // Fetch all addresses related to userId
            const userAddresses = await db.address.findMany({
                where: {
                    userId: userId
                }
            })

            // Update other addresses to set defaultBilling and defaultShipping to false
            for (const address of userAddresses) {
                const updates = {};
                if (defaultBilling && address.defaultBilling) {
                    updates.defaultBilling = false;
                }
                if (defaultShipping && address.defaultShipping) {
                    updates.defaultShipping = false;
                }

                if (Object.keys(updates).length > 0) {
                    await db.address.update({
                        where: { id: address.id },
                        data: updates
                    });
                }
            }
        }

        const updateAddress = await db.address.update({
            where: { id },
            data: {
                streetAddress1,
                streetAddress2,
                city,
                state,
                zipcode,
                country,
                defaultBilling,
                defaultShipping
            }
        });

        return NextResponse.json(updateAddress);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to update address",
                error
            },
            {
                status: 500
            }
        );
    }
}
