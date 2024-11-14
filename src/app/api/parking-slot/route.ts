import { NextRequest, NextResponse } from "next/server";
import { ParkingAIData } from "./cv-data.type";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(req: NextRequest){
    const data = await req.json() as { data : ParkingAIData}
    // check if parking space is already created 
    const checkParkingSpace = await prisma.parkingSpace.findFirst({
        where: {
            parking_name: data.data.parking_space
        }
    })
    if(!checkParkingSpace){
        try{
            const createdSpace = await prisma.parkingSpace.create({
                data:{
                    parking_name: data.data.parking_space,
                }
            })
            data.data.slots.map((slot)=>{
                
            })
        }catch(e: unknown){
            return NextResponse.json({
                message: e
            }, {
                status: 500
            })
        }
    }
    return NextResponse.json({
        message: "Data received"
    },{
        status: 200
    })
}

// export async function GET(req: NextRequest){
    
// }