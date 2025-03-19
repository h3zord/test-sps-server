import { app } from './app'
import { env } from './infra/env'

const PORT = env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
