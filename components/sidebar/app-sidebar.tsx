"use client";

import { LibraryIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { menu } from "@/config/sidebar-config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <div className="h-[54px] border-b flex items-center justify-center gap-2 px-4 w-full">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <HugeiconsIcon icon={LibraryIcon} size={18} strokeWidth={2} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">
                    <span className="truncate font-medium">Portal</span>
                    <span className="truncate text-xs">Free</span>
                </div>
            </div>
            <SidebarContent>
                <SidebarNav menu={menu} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
