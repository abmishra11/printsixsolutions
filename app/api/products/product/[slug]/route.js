import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });

    if (product) {
      const reviews = await db.review.findMany({
        where: { productId: product.id },
      });
      product.reviews = reviews;

      const category = await db.category.findUnique({
        where: { id: product.categoryId },
      });
      product.category = category;
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to delete product",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const {
      barcode,
      categoryId,
      description,
      userId,
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
    } = await request.json();

    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    const updateProduct = await db.product.update({
      where: { id },
      data: {
        barcode,
        categoryId,
        description,
        userId,
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
      },
    });

    console.log(updateProduct);
    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update product",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
