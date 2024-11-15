import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const placeId = req.nextUrl.searchParams.get("placeId") as string;

    const placeDetailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.MAPS_API_KEY}`)
    if(!placeDetailsResponse.ok){
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status:500
        })
    }
    const data = await placeDetailsResponse.json()
    const PlaceGeometry = data?.result?.geometry;
    return NextResponse.json({
        data: data,
    }, {
        status: 200
    })
}