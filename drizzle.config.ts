import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/server/db/schema',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DB_URL!,
		authToken: process.env.DB_AUTH_TOKEN!
	}
});
