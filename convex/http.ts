import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter()

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, req) => {})
})