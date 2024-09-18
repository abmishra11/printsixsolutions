import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
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
        } = await request.json()

        // Fetch all addresses related to userId
        const userAddresses = await db.address.findMany({
            where: {
                userId: userId
            }
        })

        // Check if either defaultBilling or defaultShipping is true
        if (defaultBilling || defaultShipping) {
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

        // Check if user has already added address
        let newAddressData = {}
        if(userAddresses.length > 0){
            newAddressData = {
                userId,
                streetAddress1,
                streetAddress2,
                city,
                state,
                zipcode,
                country,
                defaultBilling,
                defaultShipping
            }
        }else{
            newAddressData = {
                userId,
                streetAddress1,
                streetAddress2,
                city,
                state,
                zipcode,
                country,
                defaultBilling: true,
                defaultShipping: true
            }
        }
        // Create the new address with the new values
        const newAddress = await db.address.create({
            data: newAddressData
        })

        const addresses = await db.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc' // Sort by the createdAt field in descending order
            },
        });

        if (!addresses || addresses.length === 0) {
            return NextResponse.json(
                { message: "No addresses found" },
                { status: 404 }
            );
        }

        return NextResponse.json(addresses);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "New Address Detail not added",
                error
            },
            {
                status: 500
            }
        );
    }
}
