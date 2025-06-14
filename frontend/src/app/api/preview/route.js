import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

function getPreviewPath(contentType, slug, locale, status) {
  let basePath = "/";
  if (contentType) {
    if (contentType === "blog" || contentType.toLowerCase().includes("blog")) {
      basePath = slug ? "/" + slug : "/";
    } else {
      basePath = "/" + contentType;
    }
  }

  const localePath = locale && locale !== "en" ? "/" + locale + basePath : basePath;
  const statusParam = status ? "?status=" + status : "";
  return localePath + statusParam;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { secret, slug, locale, uid, status } = Object.fromEntries(searchParams);

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const finalPath = getPreviewPath(contentType, slug, locale, status);

  const draft = await draftMode();
  status === "draft" ? draft.enable() : draft.disable();

  redirect(finalPath);
}
