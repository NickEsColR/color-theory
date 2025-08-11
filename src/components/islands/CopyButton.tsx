import { useCallback } from "preact/hooks";
import { copyToClipboard } from "@/utils/colorUtils";

/**
 * CopyButton
 * A reusable button that copies provided text to the clipboard.
 *
 * Props:
 * - text: string to copy
 * - title: button title attribute
 * - ariaLabel: accessible label for screen readers
 */
interface CopyButtonProps {
  text: string;
  title: string;
  ariaLabel: string;
}

export default function CopyButton({
  text,
  title,
  ariaLabel,
}: CopyButtonProps) {
  const handleCopy = useCallback(async () => {
    await copyToClipboard(text);
  }, [text]);

  return (
    <button
      type="button"
      class="group p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
      onClick={handleCopy}
      title={title}
      aria-label={ariaLabel}
    >
      <svg
        class="w-4 h-4 transition-transform group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        ></path>
      </svg>
    </button>
  );
}
