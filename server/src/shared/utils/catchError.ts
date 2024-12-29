type Result<T> = [Error | null, T | null];

export const catchError = <T> (fn: () => T | Promise<T>): Promise<Result<T>> => {
  return Promise.resolve()
    .then(async () => {
      try {
        const result = await fn()
        return [null, result] as Result<T>
      } catch (error) {
        return [error, null] as Result<T>
      }
    })
}



