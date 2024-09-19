import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params: { id }}){
    try {
        const product = await db.product.findUnique({
            where: {
                id,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                
            }
        )
    }
}

export async function DELETE(request, {params: { id }}){
    try {
        const existingProduct = await db.product.findUnique({
            where: {
                id,
            },
        })

        if(!existingProduct){
            return NextResponse.json({
                data: null,
                message: "Product not found"
            }, {status: 404})
        }

        const deletedProduct = await db.product.delete({
            where: {
                id,
            },
        })

        return NextResponse.json(deletedProduct)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to delete product",
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
            barcode,
            categoryId,
            description,
            imageUrl,
            isActive,
            isWholesale,
            productCode,
            productPrice,
            salePrice,
            sku,
            slug,
            tags,
            title,
            unit,
            wholesalePrice,
            wholesaleQty,
            productStock,
            qty,
            productImages
        } = await request.json();

        // Convert string inputs to Float where necessary
        const parsedProductPrice = parseFloat(productPrice);
        const parsedSalePrice = parseFloat(salePrice);
        const parsedWholesalePrice = parseFloat(wholesalePrice);
        const parsedWholesaleQty = parseInt(wholesaleQty);
        const parsedProductStock = parseInt(productStock);
        const parsedQty = parseInt(qty);

        const existingProduct = await db.product.findUnique({
            where: {
                id,
            }
        });

        if (!existingProduct) {
            return NextResponse.json(
                {
                    data: null,
                    message: "Product not found"
                },
                {
                    status: 404
                }
            );
        }

        const updateProduct = await db.product.update({
            where: { id },
            data: {
                barcode,
                categoryId,
                description,
                imageUrl,
                productImages,
                isActive,
                isWholesale,
                productCode,
                productPrice: parsedProductPrice,
                salePrice: parsedSalePrice,
                sku,
                slug,
                tags,
                title,
                unit,
                wholesalePrice: parsedWholesalePrice,
                wholesaleQty: parsedWholesaleQty,
                productStock: parsedProductStock,
                qty: parsedQty
            }
        });

        console.log(updateProduct);
        return NextResponse.json(updateProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to update product",
                error
            },
            {
                status: 500
            }
        );
    }
}
