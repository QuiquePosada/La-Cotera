import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import keys from '../config/keys'

mapboxgl.accessToken = keys.GATSBY_MAPBOX_TOKEN
const Map = ({coordinates, html}) => {
    const mapContainer = useRef(null)
    const { longitude, latitude } = coordinates
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/quiqueposada/ckk360gax1irf17n3v3bmvlgx', // stylesheet location
            center: [longitude, latitude], // starting position [lng, lat]
            zoom: 14, // starting zoom
        })
        let marker = new mapboxgl.Marker({color: '#6a2426'}).setLngLat([longitude, latitude])
        let popup = new mapboxgl.Popup().setHTML(html)
        // const element = marker.getElement()
        // element.id = 'marker'

        // hover event listener
        // element.addEventListener('mouseenter', () => popup.addTo(map))
        // element.addEventListener('mouseleave', () => popup.remove())

        // add popup to marker
        marker.setPopup(popup)
        // add marker to map
        marker.addTo(map)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{height: '20em',padding: '1%'}}>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css" rel='stylesheet' />
            <div style={{height: '100%'}} ref={mapContainer} />
        </div>
    )
}

export default Map