import { GeocodingLocation } from "../../services/http/graphhopper/types";

export interface GeocodeInputProps {
  onSelectLocation?: (location:GeocodingLocation) => void
  className?:string
  placeholder?:string
  label?:string
  defaultValue:GeocodingLocation
}
