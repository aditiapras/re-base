"use client";

import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import {
    Menu,
    MenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuRadioGroup,
    MenuRadioItem,
    MenuSeparator,
    MenuTrigger,
} from "@/components/ui/base-menu";
import { Button } from "../ui/base-button";

export function CustomMenu() {
    const pathname = usePathname();
    const [jenjang, setJenjang] = useQueryState("jenjang");

    if (pathname.includes("peserta")) {
        const items = [
            { value: "all", label: "Semua" },
            { value: "KB/TKIT", label: "KB/TKIT" },
            { value: "SD", label: "SD" },
            { value: "SMP", label: "SMP" },
            { value: "SMA/MA", label: "SMA/MA" },
        ];
        return (
            <Menu>
                <MenuTrigger
                    render={
                        <Button size="xs" variant="outline">
                            <HugeiconsIcon icon={FilterIcon} size={24} strokeWidth={2} />{" "}
                            Jenjang Pendidikan
                        </Button>
                    }
                />
                <MenuContent sideOffset={4} className="">
                    <MenuGroup>
                        <MenuGroupLabel>Jenjang Pendidikan</MenuGroupLabel>
                        <MenuSeparator />
                        <MenuRadioGroup value={jenjang || "all"}>
                            {items.map((item) => (
                                <MenuRadioItem
                                    className="text-xs"
                                    key={item.value}
                                    value={item.value}
                                    onClick={() => setJenjang(item.value)}
                                >
                                    {item.label}
                                </MenuRadioItem>
                            ))}
                        </MenuRadioGroup>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        );
    }

    if (pathname.includes("pendaftaran")) {
        return (
            <Button size="sm" variant="primary">
                <Pen />
                Buat Pendaftaran
            </Button>
        );
    }

    return null;
}
