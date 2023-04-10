
db_reset:
	TS_NODE_PROJECT=./libs/backend/customer/data-db/tsconfig.json npx prisma migrate reset --schema=./libs/backend/customer/data-db/prisma/schema.prisma

db_build_migration:
	npx prisma migrate dev --schema=./libs/backend/customer/data-db/prisma/schema.prisma

db_push:
	npx prisma db push --schema=./libs/backend/customer/data-db/prisma/schema.prisma

db_studio:
	npx prisma studio --schema=./libs/backend/customer/data-db/prisma/schema.prisma