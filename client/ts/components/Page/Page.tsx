import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Page.module.scss";

export default function Page({ title, children }: ComponentParentProps & {
  title: string;
}) {
  document.title = `${title} | Vocabulary App`;

  return (
    <div className={cssClasses.Page}>{children}</div>
  );
}

Page.Section = ({ children }: ComponentParentProps) => {
  return (
    <section className={cssClasses.PageSection}>{children}</section>
  );
};