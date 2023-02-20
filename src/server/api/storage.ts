import fs from "fs";
import { z } from "zod";

enum Collection {
  USERS = "users",
}

const saveCollection = <T>(name: Collection, data: T[]) => {
  fs.writeFileSync(`./storage/${name}.json`, JSON.stringify(data), "utf-8");
};

const loadCollection = <T extends z.ZodTypeAny>(
  name: Collection,
  schema: T
): z.infer<T>[] => {
  let raw = "";
  try {
    raw = fs.readFileSync(`./storage/${name}.json`, "utf8");
  } catch (e) {
    fs.writeFileSync(`./storage/${name}.json`, JSON.stringify([]), "utf-8");
  }

  const json: unknown = JSON.parse(raw);
  const arraySchema = z.array(schema);

  return arraySchema.parse(json);
};

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const users = loadCollection(Collection.USERS, userSchema);

export const persist = () => {
  saveCollection(Collection.USERS, users);
};
