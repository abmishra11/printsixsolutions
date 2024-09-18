import { NextResponse } from "next/server"

export async function POST(request){
    {
        /*
          - name
          - password
          - email
          - phone
          - physicalAddress
          - username
          - dob
          - notes
          - code
          - isActive
         */
    }

    try {
        const { name, password, email, phone, physicalAddress, username, dob, notes, code, isActive } = await request.json()
        const newStaff = { name, password, email, phone, physicalAddress, username, dob, notes, code, isActive }
        console.log(newStaff);
        return NextResponse.json(newStaff)
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to create staff",
                error
            },
            {
                status: 500
            }
        )
    }
}