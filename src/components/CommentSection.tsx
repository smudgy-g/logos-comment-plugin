
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@acid-info/lsd-react'
import CommentForm from './CommentForm'
import supabase from '../supabase'
import { formatTimestamp } from '../utils/timestamp'

interface CommentSectionProps {
  commentData?: Comment[],
}

export interface Comment {
  comment_id: number
  content: string
  created_at: string
  page_id: string
  user: string
  likes: number
}

const CommentSection = ({commentData}: CommentSectionProps) => {
  console.log(commentData)

  const handleLike = async (commentId: number) => {
    try {
      const { data, error } = await supabase
        .rpc('increment', { x: 1, row_id: commentId })
  
      if (error) {
        console.error('Error updating comment:', error.message);
      } else {
        console.log('Comment updated successfully:', data);
  
        // Optionally, you can update the local state or trigger a re-fetch of comments
        // depending on your application's logic.
      }
    } catch (error) {
      console.error('Error connecting to Supabase:', error);
    }
  };

  return (
    <>
      <CommentForm />
      <div className="space-y-3">
        {commentData ? (
          commentData.map((comment) => (
            <Card size={"small"} key={comment.comment_id}>
              <CardHeader>
                <div className="flex justify-between w-full">
                  <span>{comment.user}</span>
                  <span className="text-xs">{formatTimestamp(comment.created_at)}</span>
                </div>
              </CardHeader>
              <CardBody>
                <p>{comment.content}</p>

                
                <div className="flex justify-between items-end">
                  <p className="text-xs">{comment.likes} Likes</p>
                  <ButtonGroup>
                    <Button variant={"outlined"} size={"small"} onClick={() => handleLike(comment.comment_id)}>Like</Button>
                    {/* <Button variant={"outlined"} size={"small"}>Reply</Button> */}
                  </ButtonGroup>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardBody>
                <p>No comments.</p>
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </>
  )
}

export default CommentSection