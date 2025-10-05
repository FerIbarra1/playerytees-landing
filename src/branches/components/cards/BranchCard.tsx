import { openWhatsApp } from "@/branches/utils/openWhatsApp"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Branch } from "@/interfaces/Branch"
import { MapPin, Phone, Mail, Store, Clock, Construction } from "lucide-react"


export const BranchCard = ({ branch }: { branch: Branch }) => {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{branch.name}</h3>
                        {branch.status === "coming-soon" && (
                            <Badge variant="secondary" className="ml-1">
                                Próximamente
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground flex gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{branch.address}</span>
                    </p>
                </div>
                {branch.status === "coming-soon" ? (
                    <Construction className="h-5 w-5 text-muted-foreground" />
                ) : null}
            </div>

            <Separator className="my-4" />

            <div className="grid gap-2 text-sm">
                {branch.phone && (
                    <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                            {branch.phone}
                        </a>
                    </p>
                )}
                {branch.email && (
                    <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${branch.email}`} className="hover:text-primary">
                            {branch.email}
                        </a>
                    </p>
                )}
                <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Lun–Vie 9:00–18:00 • Sáb 10:00–14:00</span>
                </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {branch.mapUrl && (
                    <Button variant="outline">
                        <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                            Cómo llegar
                        </a>
                    </Button>
                )}
                {branch.whatsapp && (
                    <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground"
                        onClick={() =>
                            openWhatsApp(
                                branch.whatsapp!,
                                `Hola ${branch.name}, me gustaría realizar un pedido de mayoreo. ¿Podemos cotizar?`
                            )
                        }
                    >
                        WhatsApp: {branch.whatsapp}
                    </Button>
                )}
            </div>
        </div>
    )
}