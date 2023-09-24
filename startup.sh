!# /bin/sh

npx dotenv-cli -e .env.prod
npx prisma migrate deploy --schema ./src/prisma/schema.prisma
npm run start