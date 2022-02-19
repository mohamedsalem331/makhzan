export const formatRentValue = (rent: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGY',
    }).format(rent)
}