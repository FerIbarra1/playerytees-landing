export interface Branch {
    id: string
    name: string
    address: string
    phone?: string
    whatsapp?: string
    email?: string
    mapUrl?: string
    coords?: { lat: number; lng: number }
    status?: "open" | "coming-soon"
}