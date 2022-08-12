import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request): Response {
    const channel = new BroadcastChannel("mqtt");

    const stream = new ReadableStream({
      start: (controller) => {
        controller.enqueue(": Welcome to mqtt message!\n\n");
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
      headers: { "content-type": "text/event-stream" },
    });
  },
};
