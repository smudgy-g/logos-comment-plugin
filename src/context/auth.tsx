import { Session, User } from '@supabase/supabase-js'
import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supabase'


interface AuthProviderProps {
  children: React.ReactNode
}
type AuthContextType = {
  session: Session | null | undefined,
  user: User | null | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
  loading: boolean
  signIn: () => void
  signOut: () => void
}
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  setUser: () => {},
  loading: true,
  signIn: () => {},
  signOut: () => {}
})

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>()
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) throw error

      setSession(session)
      setUser(session?.user)
      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user)
      setLoading(false)
    })


    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  async  function  signIn() {
    await  supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  }
  async  function  signOut() {
    await  supabase.auth.signOut();
    setUser(null);
  }

  const value = {
    session,
    user,
    setUser,
    loading,
    signIn,
    signOut
  }
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  ) 
}

export const useAuth = () => {
    const context = useContext(AuthContext)
  
    if (!context) {
      throw new Error('useAuth must be used in a Session Provider.')
    }
  
    return context
  }
