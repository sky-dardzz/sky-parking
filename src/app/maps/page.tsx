"use client"
import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { useSearchParams } from 'next/navigation';
import { ParkingSlot, ParkingSpace } from '@prisma/client';
import { AdvancedMarker, APIProvider, Map, Marker, Pin, ColorScheme } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { twMerge } from 'tailwind-merge';
export default function Page() {
  const searchParams = useSearchParams()
  const lat = Number(searchParams.get("lat"))
  const lng = Number(searchParams.get("lng"))
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>()
  const [activeSpace, setActiveSpace] = useState<string>("")
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>()
  const defaultProps = {
    center: {
      lat,
      lng
    },
    zoom: 11
  };
  const fetchParkingSpaces = async () => {
    const res = await fetch('http://localhost:3000/api/parking-space', {
      method: "GET"
    })
    const data = await res.json()
    setParkingSpaces(data.data)
  }
  const fetchParkingSlots = async () => {

    const res = await fetch(`http://localhost:3000/api/get-parking-slot?parkingSpace=SKYPARKING`)
    if (res.ok) {
      const data = await res.json()
      setParkingSlots(data.data.parking_slot)
    } else {
      console.log("fuck")
    }

  }
  useEffect(() => {

    fetchParkingSpaces()
  }, [])
  return (
    // Important! Always set the container height explicitly
    <div className='h-screen w-full grid grid-cols-5'>
      <div className="col-span-3">
        <APIProvider apiKey={"AIzaSyBMKztq1mttpaJ9rmUZNSsHHrEanWNzIXU"} >
          <Map
            className='w-full h-screen'
            defaultCenter={defaultProps.center}
            defaultZoom={15}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={"test"}
            colorScheme={ColorScheme.DARK}
          >
            {parkingSpaces &&
              parkingSpaces.map((space) => {
                return (
                  <AdvancedMarker className='' position={{ lat: space.latitude as number, lng: space.longitude as number }} onClick={() => {
                    setActiveSpace(space.parking_name)

                    fetchParkingSlots()
                  }}>
                    <div className="relative inline-block bg-[#90EE90] p-1 rounded-full shadow-md hover:cursor-pointer">
                      <Image
                        alt="skypark-logo"
                        width={40}
                        height={40}
                        src="/skypark-logo.png"
                      />
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#90EE90]"></div>
                    </div>
                  </AdvancedMarker>
                )
              })
            }
            {parkingSlots &&
              parkingSlots.map((slot) => {
                return (
                  <AdvancedMarker className='' position={{ lat: slot.lat as number, lng: slot.long as number }} onClick={() => {
                    fetchParkingSlots()
                  }}>
                    <div className={twMerge("relative inline-block  p-1 rounded-full shadow-md hover:cursor-pointer", (slot.status.toLowerCase() === 'occupied' ? "bg-red-700" : "bg-white"))}>
                      <Image
                        alt="skypark-logo"
                        width={40}
                        height={40}
                        src="/skypark-logo.png"
                      />
                      <div className={twMerge("absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8", (slot.status.toLowerCase() === 'occupied' ? "border-t-red-700" : "border-t-white"))}></div>
                    </div>
                  </AdvancedMarker>
                )
              })
            }



          </Map>
        </APIProvider>
      </div>
      <div className='col-span-2'>
        <h1 className="text-2xl text-skyparkPrimary font-semibold  py-5 px-5">Parking Slots</h1>
        {parkingSlots && parkingSlots.map((slot) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>
                  Parking Slot: {slot.label}
                </CardTitle>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
