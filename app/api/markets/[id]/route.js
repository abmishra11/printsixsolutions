import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id }}){
    try {
        const market = await db.market.findUnique({
            where: {
                id,
            },
        })
        return NextResponse.json(market)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch market",
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
        const existingMarket = await db.market.findUnique({
            where: {
                id,
            },
        })

        if(!existingMarket){
            return NextResponse.json(
                {
                    data: null,
                    message: "Market not found"
                },
                {
                    status: 500
                }
            )
        }

        const deleteMarket = await db.market.delete({
            where: {
                id,
            }
        })

        return NextResponse.json(deleteMarket)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete market",
                error,
            },
            {
                status: 500
            }
        )
    }
}