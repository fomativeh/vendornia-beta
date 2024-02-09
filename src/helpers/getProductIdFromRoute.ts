"use client"
export const getProductIdFromRoute = () => {
    const productId = window.location.href.split("/")[3]
    return productId
}