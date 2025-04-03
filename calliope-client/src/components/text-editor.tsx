import { UpdateNoteCommand } from "@/models/AsyncCommand";
import { ToastPromiseCommandDecorator } from "@/models/AsyncCommandDecorator";
import Library from "@/models/Library";
import LibraryManager from "@/models/LibraryManager";
import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  MDXEditor,
  MDXEditorMethods,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({ imageUploadHandler: async () => "/sample-image.png" }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

// Use forwardRef to pass the ref to MDXEditor
const TextEditor = forwardRef<MDXEditorMethods, { library: Library }>(
  ({ library }, ref) => {
    const [markdown, setMarkdown] = useState(library.currentNote.content);

    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMarkdownChange = useCallback((newMarkdown: string) => {
      setMarkdown(newMarkdown);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        const updateCommand = new UpdateNoteCommand();
        const decoratedCommand = new ToastPromiseCommandDecorator(
          updateCommand,
          "Sauvegarde...",
          "Sauvegardée !",
          "Échec de la sauvegarde",
        );
        decoratedCommand.execute();
      }, 2000);
    }, []);
    // Effect to set the editorRef in LibraryManager
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        LibraryManager.getInstance().editorRef =
          ref as React.RefObject<MDXEditorMethods>;
        console.log(LibraryManager.getInstance().editorRef);
      }
    }, [ref]);

    return (
      <MDXEditor
        ref={ref}
        markdown={markdown}
        onChange={handleMarkdownChange}
        className="full-demo-mdxeditor"
        contentEditableClassName="prose max-w-full font-sans"
        plugins={allPlugins(library.currentNote.content)}
      />
    );
  },
);

TextEditor.displayName = "TextEditor"; // Necessary for forwardRef

export default TextEditor;
