"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarNav({
    menu,
}: {
    menu: {
        title: string;
        items: {
            name: string;
            url: string;
            icon: React.ReactNode;
        }[];
    };
}) {
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
                {menu.items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <Link href={item.url}>
                            <SidebarMenuButton
                                tooltip={item.name}
                                className={`${pathname === item.url ? "border-l-primary bg-sidebar-accent" : "border-l-transparent"} hover:cursor-pointer hover:border-l-2 hover:border-l-primary border-l-2 rounded-l-none`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
