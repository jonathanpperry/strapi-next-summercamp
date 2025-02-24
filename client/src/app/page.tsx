import { BlockRenderer } from "@/components/BlockRenderer";
import { BlogCard } from "@/components/BlogCard";
import { ContentList } from "@/components/ContentList";

import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { PageProps } from "../../.next/types/app/layout";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  console.log(data);
  return { ...data.data };
}

export default async function HomeRoute({ searchParams}: PageProps) {
  const {query} = await searchParams;
  const data = await loader();
  const blocks = data?.blocks || [];
  console.log(data);
  return (
    <div className="container">
      <BlockRenderer blocks={blocks} />;
      <ContentList
        headline="Featured Articles"
        path="/api/articles"
        component={BlogCard}
        featured
        showSearch
        query={query}
      />
    </div>
  );
}
