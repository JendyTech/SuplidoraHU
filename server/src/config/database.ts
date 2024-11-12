import colors from 'colors'
import { connect } from 'mongoose'
import { MONGO_URI } from '@config/enviroments'

connect(MONGO_URI)
  .then(() => {
    console.log(colors.blue(`[DATABASE]: connected`))
  })
  .catch((error) => {
    console.error(
      colors.red(`[DATABASE]: error conecting to database :: `),
      error,
    )
  })
