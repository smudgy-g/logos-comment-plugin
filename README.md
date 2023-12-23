# Comment Plugin for Logos Documentation Websites



The database is structured simply:
- comment_id: serialized id for eachof the comments,
- page_url: takes the page url so that the appropriate comments can be returved from the database,
- username: this sis the authentiacated users Github handle,
- content: the content of the comment,
- created_at: The generated time of each comment,
- likes: the number of likes for each comment

The Comment context uses the current page of the window (this can be changed to the location if you wish) to fetch

Problems:
1. Unfortunately the Supabase authentication is not working, giving me cors errors. This is most likely due to the protocol not being secure. Wierd since I have had no troubles in the past.

TODO:
- Look into supabase realtime subscriptions.