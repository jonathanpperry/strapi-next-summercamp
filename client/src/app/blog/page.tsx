import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogRoute({ params }: PageProps) {
  const { blocks } = await loader("blog");
  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Check out our latest blog posts"
        path="/api/articles"
        component={BlogCard}
      />
    </div>
  );
}
