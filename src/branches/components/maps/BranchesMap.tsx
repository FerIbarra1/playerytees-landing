import { openWhatsApp } from "@/branches/utils/openWhatsApp";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/interfaces/Branch"
import { Store } from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

interface Props {
    branches: Branch[];
}

export const BranchesMap = ({ branches }: Props) => {

    return (
        <div className="rounded-2xl overflow-hidden border border-border">
            <MapContainer
                center={{ lat: 23.6345, lng: -102.5528 }}
                zoom={5}
                className="h-[600px] w-full"
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    detectRetina
                />
                {branches.filter((branch) => branch.coords && branch.status !== "coming-soon").map((branch) => (
                    <Marker
                        key={branch.id}
                        position={[branch.coords!.lat, branch.coords!.lng]}

                    // icon={}
                    >
                        <Popup>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 justify-center">
                                    <Store className="h-5 w-5" />
                                    <h3 className="font-bold text-xl">{branch.name}</h3>
                                </div>
                                <p className="text-normal text-muted-foreground">{branch.address}</p>
                                <div className="mt-2 flex gap-2 justify-center">
                                    {branch.mapUrl && (
                                        <Button className="text-xs bg-primary">
                                            <a
                                                href={branch.mapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="!text-primary-foreground"
                                            >
                                                Cómo llegar
                                            </a>
                                        </Button>
                                    )}
                                    {branch.whatsapp && (
                                        <Button
                                            className="text-xs bg-emerald-500 hover:bg-emerald-600"
                                            onClick={() => openWhatsApp(branch.whatsapp!)}
                                        >
                                            WhatsApp
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}