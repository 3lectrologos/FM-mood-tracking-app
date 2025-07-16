CREATE TABLE "data" (
	"date" date PRIMARY KEY NOT NULL,
	"mood" text NOT NULL,
	"sleep" text NOT NULL,
	"comment" text,
	"tags" text[] DEFAULT '{}'
);
