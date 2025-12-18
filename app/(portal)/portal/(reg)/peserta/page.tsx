"use client";
import {
    CancelCircleHalfDotIcon,
    CheckmarkBadge02Icon,
    FilterIcon,
    UserGroupIcon,
    UserSearch01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/base-button";
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/base-tabs";
import { DataTable } from "@/components/ui/data-table";
import { Input, InputWrapper } from "@/components/ui/input";
import { MOCK_PARTICIPANTS } from "@/mock-data";
import { columns } from "./columns";

export default function Page() {
    const [tab, setTab] = useQueryState("tabs");
    const [jenjang, setJenjang] = useQueryState("jenjang");
    const [search, setSearch] = useQueryState("search");
    const handleTabChange = (value: string) => {
        setTab(value);
        setSearch("");
    };
    const items = [
        { value: "all", label: "Semua" },
        { value: "KB/TKIT", label: "KB/TKIT" },
        { value: "SD", label: "SD" },
        { value: "SMP", label: "SMP" },
        { value: "SMA/MA", label: "SMA/MA" },
    ];

    // Filter logic for tabs could go here, e.g. MOCK_PARTICIPANTS.filter(...)
    // But for "all" we pass everything.

    return (
        <div className="flex flex-1 flex-col">
            <div className="border-b grid grid-cols-4">
                <div className="flex flex-col gap-4 p-4 border-r">
                    <p className="text-sm font-semibold">Total Peserta</p>
                    <p className="text-2xl font-bold">100</p>
                </div>
                <div className="flex flex-col gap-4 p-4 border-r">
                    <p className="text-sm font-semibold">Sudah Diverifikasi</p>
                    <p className="text-2xl font-bold">100</p>
                </div>
                <div className="flex flex-col gap-4 p-4 border-r">
                    <p className="text-sm font-semibold">Belum Diverifikasi</p>
                    <p className="text-2xl font-bold">100</p>
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <p className="text-sm font-semibold">Lulus</p>
                    <p className="text-2xl font-bold">100</p>
                </div>
            </div>
            <Tabs onValueChange={handleTabChange} value={tab || "all"}>
                <TabsList variant="line" className="px-4">
                    <TabsTrigger value="all" className="border-b">
                        <HugeiconsIcon icon={UserGroupIcon} size={24} strokeWidth={2} />
                        Semua
                    </TabsTrigger>
                    <TabsTrigger value="verified" className="border-b">
                        <HugeiconsIcon
                            icon={CheckmarkBadge02Icon}
                            size={24}
                            strokeWidth={2}
                        />
                        Sudah Diverifikasi
                    </TabsTrigger>
                    <TabsTrigger value="unverified" className="border-b">
                        <HugeiconsIcon
                            icon={CancelCircleHalfDotIcon}
                            size={24}
                            strokeWidth={2}
                        />
                        Belum Diverifikasi
                    </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4 px-4 my-4">
                    <InputWrapper className="w-fit" variant="sm">
                        <HugeiconsIcon icon={UserSearch01Icon} strokeWidth={2} />
                        <Input
                            value={search || ""}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            variant="sm"
                            placeholder="Cari peserta..."
                        />
                    </InputWrapper>
                    <Menu>
                        <MenuTrigger
                            render={
                                <Button size="sm" variant="outline">
                                    <HugeiconsIcon
                                        icon={FilterIcon}
                                        size={24}
                                        strokeWidth={2}
                                    />{" "}
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
                </div>
                <TabsContent value="all">
                    <div className="flex flex-1 flex-col">
                        <DataTable
                            columns={columns}
                            data={MOCK_PARTICIPANTS}
                            globalFilter={search || ""}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="verified">
                    <div className="flex flex-1 flex-col px-4">
                        <DataTable
                            columns={columns}
                            data={MOCK_PARTICIPANTS.filter((p) => p.isVerified)}
                            globalFilter={search || ""}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="unverified">
                    <div className="flex flex-1 flex-col px-4">
                        <DataTable
                            columns={columns}
                            data={MOCK_PARTICIPANTS.filter((p) => !p.isVerified)}
                            globalFilter={search || ""}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
