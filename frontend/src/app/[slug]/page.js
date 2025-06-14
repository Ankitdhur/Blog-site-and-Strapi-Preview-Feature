export const dynamic = "force-dynamic";

import { draftMode } from "next/headers";

export default async function BlogPage({ params }) {
  const { isEnabled } = await draftMode();
  const slug = params.slug;

  console.log("Draft mode is enabled:", isEnabled);

  const token = isEnabled ? process.env.STRAPI_PREVIEW_TOKEN : undefined;

  const query = isEnabled
    ? `?publicationState=preview&filters[slug][$eq]=${slug}&populate=*`
    : `?filters[slug][$eq]=${slug}&populate=*`;

  const res = await fetch(`http://localhost:1337/api/blogs${query}`, {
    cache: "no-store",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  const json = await res.json();
  const blog = json.data?.[0];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Blog not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F0F4F8] to-white py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 transition duration-300">
        <img
          className="w-full h-[400px] object-cover rounded-xl mb-8"
          alt={blog.title}
          src={
            blog?.imgsrc?.[0]?.url
              ? `http://localhost:1337${blog.imgsrc[0].url}`
              : "https://dummyimage.com/720x600"
          }
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
        <pre className="text-gray-700 text-lg font-sans leading-relaxed mb-8 whitespace-pre-wrap break-words">
          {blog.content || "No content available for this blog."}
        </pre>
        <div className="flex justify-start">
          <a href="/">
            <button className="bg-[#9A145D] hover:bg-[#7c0f49] text-white cursor-pointer font-medium py-2 px-6 rounded-lg transition duration-300">
              ← Go Back
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
