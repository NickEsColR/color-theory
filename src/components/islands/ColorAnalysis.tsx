import { Fragment, render, type VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import ColorCard from '@/components/islands/ColorCard';
import {
  createColor,
  getAnalogous,
  getComplementary,
  getShade,
  getTint,
  getTetradic,
  getTriadic,
  type Color,
} from '@/utils/colorUtils';
import { sections } from '@/constants/sections';

function renderInto(containerId: string, node: VNode | VNode[]) {
  const el = document.getElementById(containerId);
  if (el) render(node, el);
}

export default function ColorAnalysis() {
  const [hex, setHex] = useState<string>('#000000');

  useEffect(() => {
    const colorPicker = document.getElementById('color-picker') as HTMLInputElement | null;
    const hexInput = document.getElementById('hex-input') as HTMLInputElement | null;

    // Initialize from existing inputs if available
    const initial = colorPicker?.value || hexInput?.value || hex;
    setHex(initial);

    const onPicker = (e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      setHex(v);
      if (hexInput) hexInput.value = v;
    };
    const onHex = (e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        setHex(v);
        if (colorPicker) colorPicker.value = v;
      }
    };

    colorPicker?.addEventListener('input', onPicker);
    hexInput?.addEventListener('input', onHex);

    return () => {
      colorPicker?.removeEventListener('input', onPicker);
      hexInput?.removeEventListener('input', onHex);
    };
  }, []);

  useEffect(() => {
    // Compute palettes and render into containers (async since utilities now return Promises)
    (async () => {
      const base: Color = await createColor(hex);

      // Selected/Base
      renderInto(sections[0].contentId, <ColorCard color={base} />);

      // Complementary
      const comp = await getComplementary(base);
      renderInto(sections[1].contentId, <ColorCard color={comp} />);

      // Analogous (2)
      const an = await getAnalogous(base);
      renderInto(sections[2].contentId, (
        <Fragment>
          {an.map((c) => (
            <ColorCard color={c} />
          ))}
        </Fragment>
      ));

      // Triadic (3 incl base)
      const tri = await getTriadic(base);
      renderInto(sections[3].contentId, (
        <Fragment>
          {tri.map((c) => (
            <ColorCard color={c} />
          ))}
        </Fragment>
      ));

      // Tetradic (4 incl base)
      const tet = await getTetradic(base);
      renderInto(sections[4].contentId, (
        <Fragment>
          {tet.map((c) => (
            <ColorCard color={c} />
          ))}
        </Fragment>
      ));

      // Tint and Shade (single each)
      renderInto(sections[5].contentId, <ColorCard color={await getTint(base)} />);
      renderInto(sections[6].contentId, <ColorCard color={await getShade(base)} />);
    })();
  }, [hex]);

  return null;
}
