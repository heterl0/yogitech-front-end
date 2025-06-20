import "@/utils/highlight";

// markdown plugins
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "@mui/material/Link";
import { RouterLink } from "@/routes/components";
import StyledMarkdown from "./styles";
import { MarkdownProps } from "./types";
import Image from "next/image";

// ----------------------------------------------------------------------

export default function Markdown({ sx, ...other }: MarkdownProps) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          [remarkGfm, { singleTilde: false }],
        ]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  );
}

// ----------------------------------------------------------------------

const components = {
  img: ({ ...props }) => (
    <span className="inline-flex w-full justify-center">
      <Image
        alt={props.alt || "image in markdown"}
        src={props.src}
        height={props.height ?? 628}
        width={props.width ?? 940}
        className="rounded-xl"
        sizes="(max-width: 900px) 100vw, (max-width: 1600px) 50vw, 940px"
        {...props}
        loading="lazy"
      />
    </span>
  ),
  a: ({ ...props }) => {
    const isHttp = props.href.includes("http");

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link component={RouterLink} href={props.href} {...props}>
        {props.children}
      </Link>
    );
  },
};
