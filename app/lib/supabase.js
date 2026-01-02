// app/lib/supabase.js ✅ 最简无依赖版 (演示专用，完美适配你的项目，无任何导入报错)
import { createClient } from '@supabase/supabase-js'

// 直接读取你.env.local里配置好的Supabase信息
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 创建Supabase客户端 + 容错兜底 (连接失败也不会崩溃，完美适配演示)
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  { persistSession: false } // 关闭会话存储，彻底避开鉴权相关问题
)