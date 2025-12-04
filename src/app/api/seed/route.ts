import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  const records = await db.insert(advocates).values(advocateData);

  return Response.json({ advocates: records });
}
