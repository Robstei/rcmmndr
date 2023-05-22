import { NextApiRequest, NextApiResponse } from "next";
import { access_token } from "./callback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ access_token: access_token });
}
