import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type Props = { content: string };

// GitHub READMEs use tags like <picture>, <source>, align on <div>
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "picture", "source"],
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), "align"],
    img: [...(defaultSchema.attributes?.img ?? []), "height", "alt"],
    source: ["media", "srcset"],
    a: [...(defaultSchema.attributes?.a ?? []), "href", "target", "rel"],
  },
};

export function ReadmeSection({ content }: Props) {
  return (
    <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold">README</h2>
      <div className="readme-content mt-4 max-w-none text-sm leading-relaxed [&_a]:text-blue-600 [&_a]:underline [&_code]:text-sm [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_img]:h-auto [&_img]:max-w-full [&_pre]:rounded [&_pre]:bg-zinc-100 [&_pre]:p-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeSanitize, { schema: sanitizeSchema }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
}
