import { Session } from "next-auth";
import { auth } from "./auth";

export const AuthenticatedAction = <Input extends unknown[], R>(
  action: (session: Session, ...args: Input) => Promise<R>
) => {
  return async (...args: Input) => {
    const session = await auth();
    if (session === null) {
      throw new Error("Must be Authenticated");
    }
    return action(session, ...args);
  };
};
