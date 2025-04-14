import { describe, it, expect } from "vitest";
import NavItem from "@/models/NavItem";
import NavItemAdapter from "@/models/NavItemAdapter";

type ApiResponse = {
  success: boolean;
  root: {
    public_root_ressource: string;
    root_name: string;
  };
  arborescence: {
    child_ressource_id: string;
    child_ressource_name: string;
    child_ressource_nature: "dossier" | "note";
    parent_ressource_id: string;
    parent_ressource_name: string;
  }[];
};
// Mock de la réponse API
const mockResponse: ApiResponse = {
  success: true,
  root: {
    public_root_ressource: "root_1",
    root_name: "Root",
  },
  arborescence: [
    {
      child_ressource_id: "child_1",
      child_ressource_name: "Child 1",
      child_ressource_nature: "dossier",
      parent_ressource_id: "root_1",
      parent_ressource_name: "Root",
    },
    {
      child_ressource_id: "child_2",
      child_ressource_name: "Child 2",
      child_ressource_nature: "note",
      parent_ressource_id: "child_1",
      parent_ressource_name: "Child 1",
    },
  ],
};

describe("NavItemAdapter", () => {
  it("should convert API response to correct NavItem structure", () => {
    const root = NavItemAdapter.convertToNavItems(mockResponse);

    // Vérification de la racine
    expect(root).toBeInstanceOf(NavItem);
    expect(root.title).toBe("Root");
    expect(root.nature).toBe("dossier");
    expect(root.url).toBe("root_1");

    // Vérification du premier enfant
    const child1 = root.items[0];
    expect(child1).toBeInstanceOf(NavItem);
    expect(child1.title).toBe("Child 1");
    expect(child1.nature).toBe("dossier");
    expect(child1.url).toBe("child_1");

    // Vérification du deuxième enfant
    const child2 = child1.items[0];
    expect(child2).toBeInstanceOf(NavItem);
    expect(child2.title).toBe("Child 2");
    expect(child2.nature).toBe("note");
    expect(child2.url).toBe("child_2");

    // Vérification des relations parent-enfant
    expect(child1.items).toContain(child2);
  });
});
