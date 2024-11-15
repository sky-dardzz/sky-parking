import React from 'react'

interface MarkerProps extends React.HTMLProps<HTMLDivElement>  {
    lat: number;
    lng: number;
    name: string;
}


const Marker: React.FC<MarkerProps> =({lat, lng, name}) => {
  return (
    <div className="w-20 aspect-square rounded-full bg-red">
      {name}
    </div>
  )
}

export default Marker;
