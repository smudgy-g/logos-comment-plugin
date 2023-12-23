export const formatTimestamp = (createdAtString: string) => {
  const createdAt = new Date(createdAtString);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    
  });

  return formatter.format(createdAt);
};