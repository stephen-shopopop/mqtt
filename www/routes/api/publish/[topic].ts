import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Message } from "../../../types/message.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    const topic = ctx.params.topic.replace(/[^\w]/g, "");
    const msg = await req.json();

    const user = msg["user"];
    if (typeof user !== "string") {
      return Response.json("invalid user", { status: 400 });
    }

    const body = msg["data"];
    if (typeof body !== "string") {
      return Response.json("invalid data", { status: 400 });
    }

    const channel = new BroadcastChannel(topic);

    const message: Message = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      user,
      body,
    };

    channel.postMessage(message);
    // TODO add setTimeout because error promise
    setTimeout(() => channel.close(), 100);

    return Response.json("message send!");
  },
};
