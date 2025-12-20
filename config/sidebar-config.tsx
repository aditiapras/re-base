import { BookEditIcon, Calendar01Icon, Home01Icon, InformationCircleIcon, NewsIcon, StudentsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const menu =
{
    title: "Portal",
    items: [
        {
            name: "Dashboard",
            url: "/portal",
            icon: <HugeiconsIcon icon={Home01Icon} strokeWidth={2} size="24" />,
        },
    ],
};

export const menuInformasi = {
    title: "Informasi",
    items: [
        {
            name: "Informasi",
            url: "/portal/informasi",
            icon: <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} size="24" />,
        },
        {
            name: "Kegiatan",
            url: "/portal/kegiatan",
            icon: <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} size="24" />,
        },
        {
            name: "Blog & Artikel",
            url: "/portal/blog",
            icon: <HugeiconsIcon icon={NewsIcon} strokeWidth={2} size="24" />,
        },
    ],
}

export const menuSubmission = {
    title: "Penerimaan Siswa Baru",
    items: [
        {
            name: "Pendaftaran",
            url: "/portal/pendaftaran",
            icon: <HugeiconsIcon icon={BookEditIcon} strokeWidth={2} size="24" />,
        },
        {
            name: "Peserta",
            url: "/portal/peserta",
            icon: <HugeiconsIcon icon={StudentsIcon} strokeWidth={2} size="24" />,
        },
    ]
}