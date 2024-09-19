import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request, {params: {id}}){
    try {
        const order = await db.order.findUnique({
            where: {
                id
            },
            include:{
                orderItems:true
            }
        })
        return NextResponse.json(order)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch order",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(request, {params: {id}}){
    try {
        const existingOrder = await db.order.findUnique({
            where: {
                id
            }
        })

        if(!existingOrder){
            return NextResponse.json(
                {
                    data: null,
                    message: "Order not found"
                },
                {
                    status:404
                }
            )
        }

        const deletedOrder = await db.order.delete({
            where: {
                id
            }
        })
        return NextResponse.json(deletedOrder)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete an order",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function PUT(request, {params: { id }}){
    try {
        const { orderStatus } = await request.json()
        const existingOrder = await db.order.findUnique({
            where:{
                id,
            }
        })
        console.log("Order detail", existingOrder);
        if(!existingOrder){
            return NextResponse.json(
                {
                    data: null,
                    message: "Order not found"
                },
                {
                    status: 404
                }
            )
        }

        const updateOrder = await db.order.update({
            where: { id },
            data: {orderStatus}
        })

        console.log(updateOrder);
        return NextResponse.json(updateOrder)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to change order status",
                error
            },
            {
                status: 500
            }
        )
    }
}