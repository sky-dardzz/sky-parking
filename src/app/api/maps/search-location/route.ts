import { NextRequest, NextResponse } from "next/server";

export  async function GET(req: NextRequest){
    const location = req.nextUrl.searchParams.get("location") as string;

    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${process.env.MAPS_API_KEY}&limit=5&rankby=distance`)
    if(!res.ok){
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
    const data = await res.json() as google.maps.places.AutocompleteResponse;
    const predictions = data.predictions as google.maps.places.AutocompletePrediction[];
    // const coordinatesAPI = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.MAPS_API_KEY}`)

    const results = await Promise.all(predictions.map(async (prediction) => {
        const placeId = prediction.place_id;
        const coordinatesRes = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.MAPS_API_KEY}`);
        if (!coordinatesRes.ok) {
            return null;
        }
        const coordinatesData = await coordinatesRes.json();
        const location = coordinatesData.result.geometry.location;
        return {
            description: prediction.description,
            place_id: prediction.place_id,
            coordinates: {...location}
        };
    }));

    const filteredResults = results.filter(result => result !== null);
    return NextResponse.json({
        data: filteredResults
    }, {
        status: 200
    })

}