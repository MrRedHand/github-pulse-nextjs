import ReactMarkdown from "react-markdown";

type Props = { content: string };

export function ReadmeSection({ content }: Props) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">README</h2>
      <div className="mt-4 max-w-none rounded-lg border border-zinc-200 p-6 text-sm leading-relaxed [&_code]:text-sm [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_pre]:rounded [&_pre]:bg-zinc-100 [&_pre]:p-3">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
