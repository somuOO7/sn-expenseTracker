export const formatShortDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[Number(month) - 1]} ${year.slice(-2)}`;
};
