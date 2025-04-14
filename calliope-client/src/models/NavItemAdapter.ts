import NavItem from "./NavItem";

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

/**
 * Adapter class to convert API response into a hierarchical structure of NavItem objects.
 *
 * This class is responsible for transforming the API response into a tree-like structure
 * where each NavItem can have child NavItems, allowing for easy navigation and representation
 * of the data.
 */
class NavItemAdapter {
  static convertToNavItems(response: ApiResponse): NavItem {
    const map = new Map<string, NavItem>();

    // Création du nœud racine
    const root = new NavItem(
      response.root.root_name,
      "dossier",
      `${response.root.public_root_ressource}`,
    );
    map.set(response.root.public_root_ressource, root);

    // Création des objets NavItem pour chaque entrée de l'arborescence
    response.arborescence.forEach(
      ({
        child_ressource_id,
        child_ressource_name,
        child_ressource_nature,
      }) => {
        if (!map.has(child_ressource_id)) {
          map.set(
            child_ressource_id,
            new NavItem(
              child_ressource_name,
              child_ressource_nature,
              `${child_ressource_id}`,
            ),
          );
        }
      },
    );

    // Liaison parent-enfant
    response.arborescence.forEach(
      ({ child_ressource_id, parent_ressource_id }) => {
        const parent = map.get(parent_ressource_id);
        const child = map.get(child_ressource_id);
        if (parent && child) {
          parent.addItems(child);
        }
      },
    );

    return root;
  }
}

export default NavItemAdapter;
