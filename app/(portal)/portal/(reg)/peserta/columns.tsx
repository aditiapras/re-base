"use client";

import { SortingAZ01Icon, SortingAZ02Icon, SortingZA01Icon, } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment-timezone";
import { Badge } from "@/components/ui/base-badge";
import { Button } from "@/components/ui/base-button";
import {
    Menu,
    MenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuSeparator,
    MenuTrigger,
} from "@/components/ui/base-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Use mocked data type for now, or define a proper interface if shared
export type Participant = {
    _id: string;
    submissionId: string;
    submissionStatus: string; // "Lulus", "Tidak Lulus", etc.
    isVerified: boolean;
    name: string;
    nickname: string;
    nik: string;
    nisn: string;
    gender: string;
    // ... other fields
};

export const columns: ColumnDef<Participant>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                size="sm"
                className="rounded-sm"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                size="sm"
                className="rounded-sm"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "submissionId",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    ID
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    Nama
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        )
    },
    {
        accessorKey: "nik",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    NIK
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        )
    },
    {
        accessorKey: "nisn",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    NISN
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        )
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    Jenis Kelamin
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        )
    },
    {
        accessorKey: "submissionStatus",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    Status
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        ),
        cell: ({ row }) => {
            const status = row.getValue("submissionStatus") as string;
            // Variant mapping based on status string (example logic)
            return (
                <div className="px-2">
                    <Badge
                        size="sm"
                        appearance="outline"
                        variant={
                            status.toLowerCase() === "lulus"
                                ? "success"
                                : status.toLowerCase() === "tidak lulus"
                                    ? "destructive"
                                    : "warning"
                        }
                    >
                        {status}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "isVerified",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    Verifikasi
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        ),
        cell: ({ row }) => {
            const isVerified = row.getValue("isVerified") as boolean;
            return (
                <div className="px-2">
                    <Badge
                        size="sm"
                        appearance="outline"
                        variant={isVerified ? "primary" : "warning"}
                    >
                        {isVerified ? "Sudah Diverifikasi" : "Belum Diverifikasi"}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                    Tanggal Pendaftaran
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <HugeiconsIcon icon={SortingAZ02Icon} />
                        ) : (
                            <HugeiconsIcon icon={SortingZA01Icon} />
                        )
                    ) : (
                        <ChevronsUpDown />
                    )}
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>

            </Menu>
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as string;
            return (
                <p className="text-sm px-2">{moment(createdAt).format("DD MMM YYYY, HH:mm")}</p>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            return (
                <Menu>
                    <MenuTrigger
                        render={<Button size="sm" mode="icon" variant="ghost" />}
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </MenuTrigger>
                    <MenuContent>
                        <MenuGroup>
                            <MenuGroupLabel>Aksi</MenuGroupLabel>
                            <MenuItem
                                onClick={() => navigator.clipboard.writeText(row.original._id)}
                            >
                                Salin ID
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem>Lihat Detail</MenuItem>
                            <MenuItem>Edit</MenuItem>
                        </MenuGroup>
                    </MenuContent>
                </Menu>
            );
        },
    },
];
