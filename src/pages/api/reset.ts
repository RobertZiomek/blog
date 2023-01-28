import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../server/api/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  users.splice(0, users.length);
  users.push({
    id: "9c79f079-efc5-421b-b99a-5091dccabe91",
    password: await argon2.hash("password"),
    username: "username",
  });

  res.status(200).json({ ok: true });
}
