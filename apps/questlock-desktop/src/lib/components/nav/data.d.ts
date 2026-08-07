
import ListDetailsIcon from "@tabler/icons-svelte/icons/list-details";
import SettingsIcon from "@tabler/icons-svelte/icons/settings";
import DashboardIcon from "@tabler/icons-svelte/icons/dashboard";
import FolderIcon from "@tabler/icons-svelte/icons/folder";
import HelpIcon from "@tabler/icons-svelte/icons/help";

export const NavbarData = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/svelte.svg",
        coins: 1000900,
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: DashboardIcon,
        },
        {
            title: "Quest Logs",
            url: "/quest-logs",
            icon: FolderIcon,
        },
        {
            title: "App Guard",
            url: "/app-guard",
            icon: ListDetailsIcon,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: SettingsIcon,
        },
        {
            title: "Help & Support",
            url: "/help",
            icon: HelpIcon,
        },
    ],
};
