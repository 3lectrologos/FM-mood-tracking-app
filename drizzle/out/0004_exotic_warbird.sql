ALTER TABLE "data" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "data" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "data" ADD CONSTRAINT "data_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;