export function parseDate(date: Date) {
	return new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(date);
}
