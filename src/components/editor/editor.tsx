/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import "@/utils/highlight";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef } from "react";

import { alpha } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

import { EditorProps } from "./types";
import { StyledEditor } from "./styles";
import Toolbar, { formats } from "./toolbar";
import axiosInstance, { endpoints } from "@/utils/axios";

// Import the markdown module
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    // Import the markdown module
    const { default: MarkdownShortcuts } = await import(
      "quill-markdown-shortcuts"
    );

    // Register the markdown module with Quill
    if (typeof window !== "undefined") {
      const Quill = (await import("quill")).default;
      Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
    }

    // Return a component that forwards the ref to the actual ReactQuill instance
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
    loading: () => (
      <Skeleton
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          borderRadius: 1,
          position: "absolute",
        }}
      />
    ),
  }
);

// ----------------------------------------------------------------------

export default function Editor({
  id = "minimal-quill",
  error,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const quillRef = useRef(null);

  // Example upload function (replace with your actual implementation)
  const uploadImage = useCallback(async (file: File) => {
    // Implementation example:
    // 1. Create FormData
    const formData = new FormData();
    formData.append("file", file);

    // 2. Make API call to your server
    try {
      const response = await axiosInstance.post(
        endpoints.media.uploadFile,
        formData
      );
      return response.data.file_url;
    } catch {
      throw new Error("Upload failed");
    }
  }, []);

  // Image upload handler function
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];

        // This should be replaced with your actual image upload function
        const imageUrl = await uploadImage(file);

        // Insert the image at the current cursor position
        if (quillRef.current) {
          const quillEditor = (quillRef.current as any).getEditor();
          const range = quillEditor.getSelection();
          quillEditor.insertEmbed(range.index, "image", imageUrl);
        }
      }
    };
  }, [uploadImage]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: true,
      clipboard: {
        matchVisual: false,
      },
      // Add the markdown shortcuts module
      markdownShortcuts: {},
    }),
    [id, imageHandler]
  );

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            "& .ql-editor": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >
        <Toolbar id={id} simple={simple} />

        <ReactQuill
          forwardedRef={quillRef}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
