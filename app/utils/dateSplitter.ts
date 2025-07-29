export const splitDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);

  // Format date as YYYY-MM-DD
  const date = dateObj.toISOString().split("T")[0];

  // Format time as HH:MM (local time)
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
};
