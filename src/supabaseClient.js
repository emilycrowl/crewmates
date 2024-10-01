import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://npwyylvgrfdazdhspfwa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wd3l5bHZncmZkYXpkaHNwZndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3Mzc1MzIsImV4cCI6MjA0MzMxMzUzMn0.JS1z0a1TKm0Ll_cjWCxquxkGvCXMc3br4p1sB3Hwldw"

export const supabase = createClient(supabaseUrl, supabaseKey)