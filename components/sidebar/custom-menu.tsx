"use client";

import { FileAddIcon, FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_SUBMISSION_CATEGORIES } from "@/mock-data";
import { Button } from "../ui/button";

function CustomMenuContent() {
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
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild>
                    <Button size="xs" variant="outline">
                        <HugeiconsIcon icon={FilterIcon} size={24} strokeWidth={2} />{" "}
                        Jenjang Pendidikan
                    </Button>
                </DropdownMenuTrigger>


                <DropdownMenuContent sideOffset={4} className="">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Jenjang Pendidikan</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={jenjang || "all"}>
                            {items.map((item) => (
                                <DropdownMenuRadioItem
                                    className="text-xs"
                                    key={item.value}
                                    value={item.value}
                                    onClick={() => setJenjang(item.value)}
                                >
                                    {item.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    if (pathname.includes("pendaftaran")) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="xs" variant="primary">
                        <HugeiconsIcon icon={FileAddIcon} strokeWidth={2} />
                        Buat Pendaftaran
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Buat Pendaftaran</DialogTitle>
                        <DialogDescription>
                            Isi form berikut untuk membuat pendaftaran baru.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data = Object.fromEntries(formData.entries());
                            console.log("Form Submitted:", data);
                            // TODO: Connect to backend
                        }}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 col-span-2">
                                <Label htmlFor="name">Nama Pendaftaran</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Contoh: PPDB 2024"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 col-span-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" placeholder="ppdb-2024" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="categoryId">Kategori</Label>
                                <Select name="categoryId" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MOCK_SUBMISSION_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="academicYear">Tahun Ajaran</Label>
                                <Input
                                    id="academicYear"
                                    name="academicYear"
                                    placeholder="2024/2025"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="quota">Kuota</Label>
                                <Input
                                    id="quota"
                                    name="quota"
                                    type="number"
                                    placeholder="100"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="openDate">Tanggal Buka</Label>
                                <Input id="openDate" name="openDate" type="date" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="closeDate">Tanggal Tutup</Label>
                                <Input id="closeDate" name="closeDate" type="date" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Deskripsi pendaftaran..."
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    if (pathname.includes("informasi")) {
        return (
            <Button size="sm" variant="primary">
                <Pen />
                Buat Informasi
            </Button>
        );
    }

    if (pathname.includes("blog")) {
        return (
            <Button size="sm" variant="primary">
                <Pen />
                Buat Postingan
            </Button>
        );
    }

    return null;
}

export function CustomMenu() {
    return (
        <Suspense fallback={null}>
            <CustomMenuContent />
        </Suspense>
    );
}
