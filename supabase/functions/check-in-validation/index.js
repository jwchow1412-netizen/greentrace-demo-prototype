// supabase/functions/check-in-validation/index.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

export default async function handler(req) {
  const { user_id, bin_id } = await req.json();
  try {
    await supabase
      .from('bins')
      .update({ last_checked: new Date() })
      .eq('id', bin_id);
    await supabase
      .from('users')
      .update({ points: supabase.raw('points + 50') })
      .eq('id', user_id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
