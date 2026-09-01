import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface VaultdropLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function VaultdropLogo({
  className,
  size = 38,
  showText = true,
}: VaultdropLogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group shrink-0 select-none", className)}>
      {/* Brand Icon: Electric Blue Squircle + White Paper Plane + Floating Green Dot */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Main Glowing Gradient Squircle */}
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Crisp White Paper Plane */}
          <Send
            style={{ width: `${Math.round(size * 0.48)}px`, height: `${Math.round(size * 0.48)}px` }}
            className="text-white stroke-[2.4]"
          />
        </div>

        {/* Top-Right Floating Live Green Status Dot */}
        <span className="absolute -top-1 -right-1 flex size-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full size-3 bg-emerald-400 border-2 border-background shadow-sm"></span>
        </span>
      </div>

      {/* Brand Typography matching user screenshot */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-foreground text-base sm:text-lg">
              Vaultdrop
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-950/80 text-sky-400 border border-blue-500/30 uppercase tracking-wider font-sans shadow-sm">
              GLOBAL
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono -mt-0.5 tracking-tight font-medium">
            International Escrow Cloud
          </span>
        </div>
      )}
    </div>
  );
}
