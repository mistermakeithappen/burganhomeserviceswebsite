import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not configured')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = createSupabaseClient()

export interface Project {
  id: string
  title: string
  category: string
  location: string
  description: string
  before_image_url: string
  after_image_url: string
  created_at: string
  updated_at: string
}

// Upload image to Supabase Storage
export const uploadImage = async (file: File, bucket: string, fileName: string): Promise<string> => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase!.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
}

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  if (!supabase) {
    console.warn('Supabase client is not initialized')
    return []
  }
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data || []
}

// Create new project
export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      ...project,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`)
  }

  return data
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }
}

// Delete image from storage
export const deleteImage = async (bucket: string, fileName: string): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`)
  }
}

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

export const signOut = async () => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized')
  }
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    return null
  }
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return user
}

export const getSession = async () => {
  if (!supabase) {
    return null
  }
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return session
}