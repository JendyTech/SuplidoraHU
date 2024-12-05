export const useDelay = async (delay: number) => {
  await new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
