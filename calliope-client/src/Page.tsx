import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  SandpackConfig,
  ShowSandpackInfo,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

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

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <MDXEditor
          markdown="# hello world"
          plugins={[
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: { js: "JavaScript", css: "CSS" },
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      when: (editor) => editor?.editorType === "sandpack",
                      contents: () => <ShowSandpackInfo />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>
                      ),
                    },
                  ]}
                />
              ),
            }),
          ]}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
