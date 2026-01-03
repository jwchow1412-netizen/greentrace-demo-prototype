-- 创建用户表（扩展Supabase默认auth.users）
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 自动为新注册用户创建users记录
CREATE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 创建垃圾桶表
CREATE TABLE public.bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT, -- 垃圾桶位置（如"XX小区北门"）
  last_checked TIMESTAMP WITH TIME ZONE, -- 最后检查时间
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加索引提升查询性能
CREATE INDEX idx_bins_last_checked ON public.bins(last_checked);
CREATE INDEX idx_users_id ON public.users(id);