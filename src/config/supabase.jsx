import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://acoxebxoyqdydsghjpxi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb3hlYnhveXFkeWRzZ2hqcHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODMyODEsImV4cCI6MjA2MzA1OTI4MX0.cFXqiHhPS9MMKReXzhNb-kOzRrYlIBnw8i4Ilr2XYHc"

export const supabase = createClient(supabaseUrl, supabaseKey)