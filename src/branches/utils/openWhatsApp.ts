export const openWhatsApp = (number: string, preset?: string) => {
    const intl = number.replace(/\D/g, "")
    const text = encodeURIComponent(
        preset ||
        "Hola, me gustaría solicitar una cotización y conocer disponibilidad. ¡Gracias!"
    )
    window.open(`https://wa.me/52${intl}?text=${text}`, "_blank", "noopener,noreferrer")
}