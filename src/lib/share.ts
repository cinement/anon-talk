import { toast } from "sonner";

/**
 * 현재 페이지의 URL을 클립보드에 복사합니다.
 */
export async function shareCurrentPage(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 클립보드에 복사되었습니다");
    return true;
  } catch (error) {
    toast.error("링크 복사에 실패했습니다");
    return false;
  }
}

/**
 * 특정 URL을 클립보드에 복사합니다.
 */
export async function shareUrl(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("링크가 클립보드에 복사되었습니다");
    return true;
  } catch (error) {
    toast.error("링크 복사에 실패했습니다");
    return false;
  }
}
