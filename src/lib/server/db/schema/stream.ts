import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const streamsTable = sqliteTable('streams', {
	name: text('name').notNull().primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	creator: text('creator').notNull()
});
