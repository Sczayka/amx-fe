import { Preload } from "./preload.interface"

export interface Vehicle {
    id?: string
    model: string
    year: string
    price: number
    fuelTypeId: string
    fuelTypeName: string
    gearTypeId: string
    gearTypeName: string
    manufacturerId: string
    manufacturerName: string
    colorId: string
    colorName: string
    gallery: VehicleGallery[]
    description?: string
}

export interface VehicleGallery {
    name: string,
    size: number,
    base64: string | ArrayBuffer | null
}

export interface VehiclesPreload {
    "fuel-types": Preload[]
    "gear-types": Preload[]
    manufacturers: Preload[]
    colors: Preload[]
}