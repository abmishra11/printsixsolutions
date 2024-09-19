import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request){
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                productStock: 0
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch products",
                error
            },
            {
                status: 500
            }
        )
    }
}