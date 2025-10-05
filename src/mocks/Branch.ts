import type { Branch } from "@/interfaces/Branch";

export const Branches: Branch[] = [
    {
        id: "lpz",
        name: "Playerytees La Paz",
        address:
            "Lic. Primo Verdad #2045, entre Ignacio Allende y Antonio Rosales. Col. Zona Comercial, La Paz, BCS",
        phone: "612 124 533",
        whatsapp: "612 200 3331",
        email: undefined,
        mapUrl:
            "https://www.google.com/maps/place/Playerytees+La+Paz/@24.1507002,-110.3106409,20z",
        coords: { lat: 24.1507002, lng: -110.3106409 },
        status: "open",
    },
    {
        id: "obg",
        name: "Playerytees Obregón",
        address:
            "Nicolás Bravo 700 B, Centro, Urb. No. 1, 85000 Cd. Obregón, Sonora",
        phone: "644 414 2974",
        whatsapp: "644 140 5742",
        email: "psventasobregon@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/place/Playerytees/@27.4869856,-109.9334932,21z",
        coords: { lat: 27.4869856, lng: -109.9334932 },
        status: "open",
    },
    {
        id: "hmo",
        name: "Playerytees Hermosillo",
        address: "Heriberto Aja 13, Centro, 83000 Hermosillo, Sonora",
        phone: undefined,
        whatsapp: "642 156 4947",
        email: "psventashermosillo@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/search/Calle%20Heriberto%20Aja%2027/@29.0838031768799,-110.94994354248,17z",
        coords: { lat: 29.0838032, lng: -110.9499435 },
        status: "open",
    },
    {
        id: "mxl",
        name: "Playerytees Mexicali",
        address:
            "Blvd. Lázaro Cárdenas #481, Col. Ex Ejido Coahuila, C.P. 21360, Mexicali, BC",
        phone: "(686) 523 7110",
        whatsapp: "(686) 100 5501",
        email: "psventasmexicali@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/place/PLAYERYTEES/@32.6250483,-115.4413479,21z",
        coords: { lat: 32.6250483, lng: -115.4413479 },
        status: "open",
    },
    {
        id: "nog",
        name: "Playerytees Nogales",
        address:
            "Av. Tecnológico 550 Local 7, Col. Granja, Nogales, Sonora, C.P. 84065",
        phone: "631 319 2040",
        whatsapp: "631 125 6254",
        email: undefined,
        mapUrl: undefined,
        coords: undefined,
        status: "coming-soon",
    },
]