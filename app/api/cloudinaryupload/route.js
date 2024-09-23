import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary  } from 'cloudinary';
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

//Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request){
    console.log("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("api_key", process.env.CLOUDINARY_API_KEY);
    console.log("api_secret", process.env.CLOUDINARY_API_SECRET);
    
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if (!role) {
        return NextResponse.json({
            error:  "Unauthorized",
            message: "You must be logged in to perform this action",
            status: 401
        })
    }

    try{
        const formdata = await request.formData();
        const filename = formdata.get("filename");
        const folder = formdata.get("folder");
        const file = formdata.get(filename);
        console.log("file:", file);
        const coudinaryFolderName = 'printsixsolutions/'+folder;
      
        if (!file) {
          return NextResponse.json({ error: "No file found" }, { status: 400 });
        }

        const bytes = await  file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise(
            (resolve, reject) => {
                const  uploadStream = cloudinary.uploader.upload_stream(
                    { folder:  coudinaryFolderName },
                    (error, result) => {
                        if(error) reject (error);
                        else resolve(result);
                    }
                )
                uploadStream.end(buffer)
            }
        )
        console.log("uploadResult:", uploadResult);
        console.log("imageUrl: ", uploadResult.secure_url);
        return NextResponse.json({imageUrl: uploadResult.secure_url}, {status: 200})
    } catch (error){
        console.error("Upload Image Failed", error);
        return NextResponse.json({error: "Upload Image Failed"}, {status: 500})
    }
}
