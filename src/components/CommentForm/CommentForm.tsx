
import React, { useState } from 'react'
import { Card, CardBody, Button, CardHeader } from '@acid-info/lsd-react'
import supabase from '../../supabase'
import { useCommentContext } from '../context/CommentsContext/comments'


const CommentForm: React.FC = () => {
  // const { session, user } = useAuth()
  const [content, setContent] = useState<string>('')
  const { addComment } = useCommentContext()
  const session = true
  const user = {
    handle: "smudgy-g",
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setContent('')
    addComment(content, user.handle)
  }

  return (
    <div className="mb-4">
      <Card size="small">
        {session && user && (
          <CardHeader>
            {user.handle}
          </CardHeader>
        )}
        <CardBody>
          <form onSubmit={handleSubmit}>
            <textarea
              id={"content"}
              rows={3}
              aria-label={"New comment text area"}
              placeholder={session ? "Leave a comment here..." : "Your must be logged in to leave a comment"}
              disabled={!session}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              />

            <div className="flex justify-end w-full">
              {session ? (
                <Button 
                type='submit'
                variant={"outlined"} 
                size={"medium"}
                >
                  Submit
                </Button>
              ) :(
                <Button 
                variant={"outlined"} 
                size={"small"}
                onClick={() =>
                  supabase.auth.signInWithOAuth({
                    provider: "github",
                    options: {
                      redirectTo: window.location.origin,
                    }
                  })
                }
                >
                  Sign in.
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default CommentForm