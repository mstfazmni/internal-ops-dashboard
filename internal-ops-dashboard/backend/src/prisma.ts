// single DB connection

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

//Why?
//Avoid multiple connections
//Centralized DB access