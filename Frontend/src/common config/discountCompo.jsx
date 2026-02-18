export const priceWithDiscount = (price, dis = 0) => {
  const originalPrice = Number(price) || 0
  const discount = Number(dis) || 0

  const discountAmount = Math.floor(
    (originalPrice * discount) / 100
  )

  return originalPrice - discountAmount
}
