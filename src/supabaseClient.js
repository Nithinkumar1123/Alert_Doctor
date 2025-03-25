import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://soqamogtfwnqmgcnbzpq.supabase.co';  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvcWFtb2d0ZnducW1nY25ienBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjYyNjEsImV4cCI6MjA1ODUwMjI2MX0.WmVGy3Pwp2zwYh8ODwQKvGSjOyhQNPBHi9u9wSnMG68'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
