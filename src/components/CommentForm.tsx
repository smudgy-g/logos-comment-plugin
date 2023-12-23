
import React, { useState } from 'react'
import { Card, CardBody, Button, CardHeader } from '@acid-info/lsd-react'
import supabase from '../supabase'


const CommentForm: React.FC = () => {
  // const { session, user } = useAuth()
  const [content, setContent] = useState<string>()
  const session = true
  const user = {
    id: "smudgy-g"
  }

  function handleSubmit () {
    console.log(content)
  }

  return (
    <div className="mb-4">
      <Card size="small">
        {session && user && (
          <CardHeader>
            {user.id}
          </CardHeader>
        )}
        <CardBody>
          <div>
            <textarea
              id={"content"}
              rows={3}
              aria-label={"New comment text area"}
              placeholder={session ? "Leave a comment here..." : "Your must be logged in to leave a comment"}
              disabled={!session}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        <div className="flex justify-end">
          {session ? (
            <Button 
              variant={"outlined"} 
              size={"medium"}
              onClick={handleSubmit}
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
            >Sign in.</Button>
          )}
        </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default CommentForm