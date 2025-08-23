import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDjZlszlFYYYHg6IY08G9zJ9oZbScaEVrQ';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required' },
      { status: 400 }
    );
  }

  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      return NextResponse.json(data);
    } else if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json(
        { error: 'Address not found', results: [] },
        { status: 404 }
      );
    } else {
      console.error('Geocoding error:', data.status, data.error_message);
      return NextResponse.json(
        { error: 'Geocoding service error', status: data.status },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Geocoding API error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}