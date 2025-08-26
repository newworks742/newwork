// import { validateLoginSession } from '$lib/server/loads.js';
import { fetchContacts } from '$lib/server/mongoLoads.js';
import { updatecontactstatus } from '$lib/server/mongoActions.js';

export async function load({ parent, url, fetch }) {
    // await validateLoginSession(parent);
    const page = url.searchParams.get("page");
    const search = url.searchParams.get("search");
    const filter = url.searchParams.get("filter");
    let contacts = [];
    let submissions = [];
    try {
        contacts = await fetchContacts(page, search, filter);
        console.log(contacts,"contactsssssssssss");
        
        // Return the structure that matches what your component expects
        return {
            records: contacts?.records,
            totalCount: contacts?.totalCount,
        };
    } catch (error) {
        console.error("Failed to load contacts:", error);
        return {
            records: [],
            totalCount: 0,
        };
    }
}
export const actions = {
    status: async ({ request }) => {
        const body = Object.fromEntries(await request.formData())
        // console.log(body);
        try {
            const result = await updatecontactstatus(body);
            return result
        } catch (error) {
            console.log('Error in action:', error.response)
        }
    },
}