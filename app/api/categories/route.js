import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const {title, slug, imageUrl, description, parentId, isActive} = await request.json()
        console.log(slug);
        const existingCategory = await db.category.findUnique({
            where:{
                slug
            }
        })

        if(existingCategory){
            return NextResponse.json(
                {
                    data: null,
                    message: "Category already exists"
                },
                {
                    status: 409
                }
            )
        }

        const newCategory = await db.category.create({
            data: {title, slug, imageUrl, description, parentId, isActive}
        })

        return NextResponse.json(newCategory)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to create category",
                error
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request) {
    try {
      const categories = await db.category.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          products: true,
        },
      });
      return NextResponse.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(
        {
          message: "Failed to fetch categories",
          error: error.message,  // Log the error message
        },
        {
          status: 500,
        }
      );
    }
}  