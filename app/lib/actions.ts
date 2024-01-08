'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect} from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

export async function authenticate (
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

// create new invoice
// Use Zod to update the expected types
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {

    const customerId = formData.get("customerId");
    const amount = parseFloat(formData.get("amount") as string);
    const status = formData.get("status");

    try {

        CreateInvoice.parse({
            customerId,
            amount,
            status,
        });

    } catch (validationError) {

        return { message: 'Validation Error: Invalid input.', error: validationError };

    }

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    try {

        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId?.toString()}, ${amountInCents}, ${status?.toString()}, ${date})
        `;
    
    } catch (error) {
    
        return { message: "Database Error: Failed to Create Invoice.", error };
    
    }
    
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");

}

// update an invoice
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    
    const customerId = formData.get("customerId");
    const amount = parseFloat(formData.get("amount") as string);
    const status = formData.get("status");

    try {
        
        UpdateInvoice.parse({
            customerId,
            amount,
            status,
        });

    } catch (validationError) {

        return { message: 'Validation Error: Invalid input.', error: validationError };

    }

    const amountInCents = amount * 100;

    try {
        
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId?.toString()}, amount = ${amountInCents}, status = ${status?.toString()}
            WHERE id = ${id}
        `;
        
    } catch (error) {
        
        return { message: 'Database Error: Failed to Update Invoice.', error: error}
        
    }
    
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}

// delete invoice
export async function deleteInvoice(id: string) {
    try {
        
        await sql`DELETE FROM invoices WHERE id = ${ id }`;

        revalidatePath('/dashboard/invoices');
        
    } catch (error) {
        
        return { message: 'Database Error: Failed to Delete Invoice.', error: error}

    }
}