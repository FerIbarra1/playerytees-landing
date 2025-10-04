import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import type { Product } from "@/mocks/Products"

export interface CartItem {
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
}

type CartAction =
    | { type: "HYDRATE"; items: CartItem[] }
    | { type: "ADD_ITEM"; product: Product; quantity: number }
    | { type: "REMOVE_ITEM"; productId: string }
    | { type: "SET_QUANTITY"; productId: string; quantity: number }
    | { type: "CLEAR" }
    | { type: "OPEN" }
    | { type: "CLOSE" }
    | { type: "TOGGLE" }

interface CartContextValue {
    items: CartItem[]
    count: number
    total: number
    isOpen: boolean
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateItemQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    openCart: () => void
    closeCart: () => void
    toggleCart: () => void
}

const CART_STORAGE_KEY = "playerytees:cart"
const initialState: CartState = { items: [], isOpen: false }

const CartContext = createContext<CartContextValue | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "HYDRATE":
            return { ...state, items: action.items }
        case "ADD_ITEM": {
            const { product, quantity } = action
            const existing = state.items.find((item) => item.product.id === product.id)

            if (!existing) {
                return {
                    ...state,
                    items: [...state.items, { product, quantity: Math.max(1, quantity) }],
                }
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
                        : item,
                ),
            }
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.product.id !== action.productId),
            }
        case "SET_QUANTITY": {
            const quantity = Math.max(0, action.quantity)
            if (quantity === 0) {
                return {
                    ...state,
                    items: state.items.filter((item) => item.product.id !== action.productId),
                }
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === action.productId ? { ...item, quantity } : item,
                ),
            }
        }
        case "CLEAR":
            return { ...state, items: [] }
        case "OPEN":
            return { ...state, isOpen: true }
        case "CLOSE":
            return { ...state, isOpen: false }
        case "TOGGLE":
            return { ...state, isOpen: !state.isOpen }
        default:
            return state
    }
}

function loadCartFromStorage(): CartItem[] {
    if (typeof window === "undefined") {
        return []
    }

    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY)
        if (!raw) return []

        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []

        return parsed
            .map((item) => {
                if (!item || typeof item !== "object") return null
                if (!item.product || typeof item.product !== "object") return null
                if (typeof item.product.id !== "string") return null
                if (typeof item.quantity !== "number") return null
                return {
                    product: item.product as Product,
                    quantity: Math.max(1, Math.floor(item.quantity)),
                } satisfies CartItem
            })
            .filter(Boolean) as CartItem[]
    } catch (error) {
        console.warn("Could not parse cart from storage", error)
        return []
    }
}

function persistCart(items: CartItem[]) {
    if (typeof window === "undefined") {
        return
    }

    try {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
        console.warn("Could not store cart", error)
    }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    useEffect(() => {
        const storedItems = loadCartFromStorage()
        if (storedItems.length > 0) {
            dispatch({ type: "HYDRATE", items: storedItems })
        }
    }, [])

    useEffect(() => {
        persistCart(state.items)
    }, [state.items])

    const addItemInternal = useCallback((product: Product, quantity = 1) => {
        dispatch({ type: "ADD_ITEM", product, quantity })
    }, [])

    const removeItem = useCallback((productId: string) => {
        dispatch({ type: "REMOVE_ITEM", productId })
    }, [])

    const updateItemQuantity = useCallback((productId: string, quantity: number) => {
        dispatch({ type: "SET_QUANTITY", productId, quantity })
    }, [])

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" })
    }, [])

    const openCart = useCallback(() => {
        dispatch({ type: "OPEN" })
    }, [])

    const closeCart = useCallback(() => {
        dispatch({ type: "CLOSE" })
    }, [])

    const toggleCart = useCallback(() => {
        dispatch({ type: "TOGGLE" })
    }, [])

    const addItem = useCallback(
        (product: Product, quantity = 1) => {
            addItemInternal(product, quantity)
            openCart()
        },
        [addItemInternal, openCart],
    )

    const count = useMemo(
        () => state.items.reduce((total, item) => total + item.quantity, 0),
        [state.items],
    )

    const total = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity * (item.product.price ?? 0), 0),
        [state.items],
    )

    const value = useMemo<CartContextValue>(
        () => ({
            items: state.items,
            count,
            total,
            isOpen: state.isOpen,
            addItem,
            removeItem,
            updateItemQuantity,
            clearCart,
            openCart,
            closeCart,
            toggleCart,
        }),
        [state.items, state.isOpen, count, total, addItem, removeItem, updateItemQuantity, clearCart, openCart, closeCart, toggleCart],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }

    return context
}
