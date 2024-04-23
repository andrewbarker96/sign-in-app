import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKEY = process.env.REACT_APP_SUPABASE_KEY;

const client = createClient(supabaseURL, supabaseKEY);

class Supabase {

    async getPersonnel() {
        try {
            const { data: items, error } = await client
                .from('personnel')
                .select('*');

            if (error) throw error;

            console.log('Fetched items:', items);
            return items;
        } catch (error) {
            console.error('Error fetching items:', error.message);
            throw error;
        }
    }
}

async function run() {
    try {
        const supabase = new Supabase();
        await supabase.getPersonnel();
    } catch (error) {
        console.error('Error:', error);
    }
}

run();