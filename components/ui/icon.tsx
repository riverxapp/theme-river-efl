import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ICON_ALIASES: Record<string, string> = {
  Sparkle: "Sparkles",
  LineChart: "ChartLine",
};
const ICON_REGISTRY = LucideIcons as unknown as Record<string, LucideIcon>;
const FALLBACK_ICON = LucideIcons.CircleHelp as LucideIcon;

function toPascalCase(value: string): string {
  return value
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function resolveIconName(name: string): string {
  const normalized = toPascalCase(name);
  return ICON_ALIASES[normalized] ?? normalized;
}

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}) => {
  const iconName = resolveIconName(name);
  const LucideIcon = ICON_REGISTRY[iconName] ?? FALLBACK_ICON;

  return <LucideIcon color={color} size={size ?? 20} className={className} />;
};
