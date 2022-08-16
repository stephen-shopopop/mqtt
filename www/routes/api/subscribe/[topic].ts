import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext): Response {
    const topic = ctx.params.topic.replace(/[^\w]/g, "");
    const channel = new BroadcastChannel(topic);

    const stream = new ReadableStream({
      start: (controller) => {
        controller.enqueue(`: Welcome to #${topic} message!\n\n`);
        channel.onmessage = (message) => {
          const body = `data: ${JSON.stringify(message)}\n\n`;
          controller.enqueue(body);
        };
      },
      cancel() {
        channel.close();
      },
    });

    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      headers: {
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "content-type": "text/event-stream",
      },
    });
  },
};
