import type { Color } from "@/utils/colorUtils";
import CopyButton from "@/components/islands/CopyButton";

interface Props {
  color: Color;
}

export default function ColorCard({ color }: Props) {
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;

  return (
    <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-fade-in w-full max-w-xs">
      <div
        class="w-full h-24 rounded-lg mb-3 border-2 border-gray-200 dark:border-gray-600"
        style={{ backgroundColor: color.hex }}
      />

      {color.name && (
        <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
          {color.name}
        </h3>
      )}

      <ul class="space-y-2 list-none">
        <li class="flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-white">HEX:</span>
          <div class="flex items-center gap-2">
            <code class="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded dark:text-white/90">
              {color.hex}
            </code>
            <CopyButton
              text={color.hex}
              title="Copiar código HEX"
              ariaLabel={`Copiar código HEX ${color.hex}`}
            />
          </div>
        </li>

        <li class="flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-white">RGB:</span>
          <div class="flex items-center gap-2">
            <code class="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded dark:text-white/90">
              {rgbString}
            </code>
            <CopyButton
              text={rgbString}
              title="Copiar código RGB"
              ariaLabel={`Copiar código RGB ${rgbString}`}
            />
          </div>
        </li>

        <li class="flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-white">HSL:</span>
          <div class="flex items-center gap-2">
            <code class="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded dark:text-white/90">
              {`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
            </code>
            <CopyButton
              text={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
              title="Copiar código HSL"
              ariaLabel={`Copiar código HSL hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
            />
          </div>
        </li>
      </ul>
    </article>
  );
}
