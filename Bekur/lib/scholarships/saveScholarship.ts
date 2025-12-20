
import { prisma } from "@/lib/prisma";

export async function saveScholarship(data: any) {
  return prisma.scholarship.create({ data });
}
