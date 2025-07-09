export const expiryTime = (minutesToExpiry: number) => {
    const now = new Date();
    return new Date(now.getTime() + minutesToExpiry * 60000)
}