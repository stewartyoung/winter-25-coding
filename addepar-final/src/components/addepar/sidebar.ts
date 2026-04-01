/**
 * Sidebar navigation structure documenting projects from App.tsx
 * - Data and Search Sort grouped under "Data Tables"
 * - All other projects as individual items under Projects
 */
export interface SidebarItemType {
  icon: string;
  title: string;
  path: string;
  children?: SidebarItemType[];
}

const items: SidebarItemType[] = [
  {
    icon: "fa fa-home",
    title: "Home",
    path: "/",
  },
  {
    icon: "fa fa-folder",
    title: "Projects",
    path: "#",
    children: [
      {
        icon: "fa fa-table",
        title: "Data Tables",
        path: "#",
        children: [
          { icon: "fa fa-database", title: "Data", path: "/data" },
          { icon: "fa fa-search", title: "Search & Sort", path: "/search-sort" },
        ],
      },
      { icon: "fa fa-briefcase", title: "Jobs", path: "/jobs" },
      { icon: "fa fa-window-maximize", title: "Tabs", path: "/tabs" },
      { icon: "fa fa-plane", title: "Flights", path: "/flights" },
      { icon: "fa fa-folder-open", title: "Files", path: "/files" },
      { icon: "fa fa-sliders", title: "Slider", path: "/slider" },
      { icon: "fa fa-sort", title: "Sort", path: "/sort" },
    ],
  },
];

export default items;
