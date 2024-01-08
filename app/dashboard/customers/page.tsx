import { fetchCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page({
    searchParams,
    } : {
        searchParams?: {
            query?: string;
        };
    }) {

    const query = searchParams?.query || '';
    return (
        <div className="w-full">
            <CustomersTable query={query} />
        </div>
    )
};