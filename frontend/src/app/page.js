import Link from "next/link";



export default async function Home() {
  console.log("Revalidating...");
  let data = [];

  try {

    const res = await fetch("http://localhost:1337/api/blogs?populate=*",{
      next:{
        revalidate:10
      },
    });
    const json = await res.json();
    data = json.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] to-white pt-24 pb-10">
      <section className="text-gray-800">
        <div className="container px-6 py-6 mx-auto">

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.length > 0 ? (
              data.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img
                    src={
                      blog.imgsrc && blog.imgsrc.length > 0
                        ? `http://localhost:1337${blog.imgsrc[0].url}`
                        : "https://via.placeholder.com/400x200"
                    }
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-sm text-indigo-500 font-medium uppercase mb-2">
                      {blog.category || "Category"}
                    </p>
                    <h2 className="text-xl font-semibold mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>👁 1.2K views</span>
                      <span>💬 6 comments</span>
                    </div>
                    
<div className="mt-4">
  <Link
    href={`/${blog.slug}`}
    className="inline-block text-white bg-indigo-600 hover:bg-indigo-700 font-medium px-4 py-2 rounded transition-colors duration-200"
  >
    Read More →
  </Link>
</div>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No blogs found.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
