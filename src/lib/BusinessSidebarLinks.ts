import { ROLES } from "@/models/user";
import { Settings, Settings2 } from "lucide-react";
import { HiUserAdd } from "react-icons/hi";

type BusinessSidebarLinksProps = {
    name: string;
    link: string;
    access: ROLES[];
    icon: any;
}

export const BusinessSidebarLinks:BusinessSidebarLinksProps[] = [
    {name: "Ustawienia", link: "settings", icon: Settings , access: [ROLES.ADMIN, ROLES.OWNER]},
    {name: "Test", link: "test", icon: Settings2 , access: [ROLES.CUSTOMER, ROLES.WORKER, ROLES.ADMIN, ROLES.OWNER]},
]