import { getReadme } from "@/entities/repository/api/get-readme";
import { ReadmeSection } from "./ReadmeSection";

type Props = {
  owner: string;
  name: string;
};

export async function ReadmeLoader({ owner, name }: Props) {
  const readme = await getReadme(owner, name);
  return <ReadmeSection content={readme} />;
}
