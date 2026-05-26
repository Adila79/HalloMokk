export function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID");
}