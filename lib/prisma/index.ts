import { PrismaClient, Prisma } from "./generatedClient";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["info", "warn", "error"],
  })
    .$extends({
      model: {
        $allModels: {
          async exists<T>(this: T, where: Prisma.Args<T, "findFirst">["where"]): Promise<boolean> {
            const context = Prisma.getExtensionContext(this);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await (context as any).findFirst({ where });
            return result !== null;
          },
        },
      },
    })
    .$extends(withAccelerate());
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export type * from "./generatedClient";
