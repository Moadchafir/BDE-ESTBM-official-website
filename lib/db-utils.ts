import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "db.json");

export async function readDb() {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
}

export async function writeDb(data: any) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}
