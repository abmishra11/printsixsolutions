import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request, { params: { userid }  }) {
    console.log("userid", userid);
    
    try {
        const addresses = await db.address.findMany({
            where: {
                userId: userid,
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
                message: "Failed to fetch addresses",
                error: error.message, // Provide a meaningful error message
            },
            { status: 500 }
        );
    }
}
