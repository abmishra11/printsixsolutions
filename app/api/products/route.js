import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){

    try {
        const {
            barcode,
            categoryId,
            description,
            userId,
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
            imageUrl,
            productImages
        } = await request.json();

        const existingProduct = await db.product.findUnique({
            where: {
                slug
            }
        });

        if (existingProduct) {
            return NextResponse.json(
                {
                    data: null,
                    message: "Product already exists"
                },
                {
                    status: 409
                }
            );
        }

        const existingSkuProduct = await db.product.findUnique({
            where: {
                sku
            }
        });

        if (existingSkuProduct) {
            return NextResponse.json(
                {
                    data: null,
                    message: "Product SKU already exists"
                },
                {
                    status: 409
                }
            );
        }

        const existingBarcodeProduct = await db.product.findUnique({
            where: {
                barcode
            }
        });

        if (existingBarcodeProduct) {
            return NextResponse.json(
                {
                    data: null,
                    message: "Product Barcode already exists"
                },
                {
                    status: 409
                }
            );
        }

        const data = {
            barcode,
            category: {
                connect: { id: categoryId }  // Correctly connect to the category
            },
            description,
            user: {
                connect: { id: userId }  // Correctly connect to the category
            },
            productImages,
            imageUrl,
            isActive,
            isWholesale,
            productCode,
            productPrice: parseFloat(productPrice),
            salePrice: parseFloat(salePrice),
            sku,
            slug,
            tags,
            title,
            unit,
            wholesalePrice: parseFloat(wholesalePrice),
            wholesaleQty: parseInt(wholesaleQty),
            productStock: parseInt(productStock),
            qty: parseInt(qty)
        };

        const newProduct = await db.product.create({
            data
        });

        console.log(newProduct);
        return NextResponse.json(newProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to create product",
                error
            },
            {
                status: 500
            }
        );
    }
}

export async function GET(request){
    const categoryId = request.nextUrl.searchParams.get("catId");
    const sortBy = request.nextUrl.searchParams.get("sort");
    const min = request.nextUrl.searchParams.get("min");
    const max = request.nextUrl.searchParams.get("max");
    const page = request.nextUrl.searchParams.get("page") || 1;
    const search = request.nextUrl.searchParams.get("search"); 
    const pageSize = 10;
    
    let where = {
        categoryId
    }
    if(min && max){
        where.salePrice = {
            gte: parseFloat(min),
            lte: parseFloat(max)
        }
    }else if(min){
        where.salePrice = {
            gte: parseFloat(min),
        }
    }else if(max){
        where.salePrice = {
            lte: parseFloat(max)
        }
    }
    let products;
    try {
        if(search){
            products = await db.product.findMany({
                where: {
                    OR: [
                        {
                            title: {contains: search, mode: 'insensitive'}
                        }
                    ]
                },
                include: {
                    reviews: true
                }
            })
        }else if(categoryId && page){
            products = await db.product.findMany({
                where,
                skip: (parseInt(page) - 1) * parseInt(pageSize),
                take: parseInt(pageSize),
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    reviews: true
                }
            })
        }else if(categoryId && sortBy){
            products = await db.product.findMany({
                where,
                orderBy: {
                    salePrice: sortBy === "asc" ? "asc" : "desc"
                },
                include: {
                    reviews: true
                }
            })
        }else if(categoryId){
            products = await db.product.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                where,
                include: {
                    reviews: true
                }
            })
        }else{
            products = await db.product.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    reviews: true
                }
            })
        }

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