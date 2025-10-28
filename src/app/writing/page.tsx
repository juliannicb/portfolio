import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  const posts = getAllPosts();
  return (
    <Section title="Writing">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`} className="block">
            <Card>
              <div className="text-sm text-muted">{new Date(post.date).toLocaleDateString()}</div>
              <div className="mt-1 text-lg font-semibold">{post.title}</div>
              {post.summary && <p className="mt-2 text-sm text-muted">{post.summary}</p>}
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}