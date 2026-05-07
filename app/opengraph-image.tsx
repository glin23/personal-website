import { ImageResponse } from "next/og";

/**
 * Dynamic OG image — 1200×630 PNG. Pure English per Lee's preference.
 * Mirrors the Hero's chapter-book layout: top + bottom hairlines,
 * uppercase mono meta on the corners, big serif "Lee Lin" centered with
 * "— A BUILDER —" beneath.
 *
 * Uses ImageResponse from next/og (satori under the hood). Stuck to
 * flexbox + system fonts to keep the runtime light — no font fetches,
 * no asset bundling.
 */

export const alt =
  "Lee Lin — AI Builder. Solo builder shipping AI products from Boston.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#18181b";
const stone = "#52525b";
const fog = "rgba(24, 24, 27, 0.3)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 88px",
          background:
            "linear-gradient(180deg, #faf9f4 0%, #f5f3e8 100%)",
          color: ink,
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: 18,
            borderBottom: `1px solid ${fog}`,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: stone,
              fontFamily: "monospace",
            }}
          >
            // PORTFOLIO · 2026 · V.0.6
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: stone,
              fontFamily: "monospace",
            }}
          >
            BOSTON · MMXXVI
          </div>
        </div>

        {/* CENTER */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 220,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1,
              color: ink,
              fontFamily: "serif",
            }}
          >
            Lee Lin
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 44,
                height: 1,
                background: "rgba(24, 24, 27, 0.4)",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 9,
                textTransform: "uppercase",
                color: stone,
                fontFamily: "monospace",
              }}
            >
              A BUILDER
            </div>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 1,
                background: "rgba(24, 24, 27, 0.4)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontStyle: "italic",
              color: stone,
              fontFamily: "serif",
              marginTop: 16,
            }}
          >
            shipping ai products from boston
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 18,
            borderTop: `1px solid ${fog}`,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ink,
              fontFamily: "monospace",
              fontWeight: 500,
            }}
          >
            ↳ BUILD, THEN SHIP.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ink,
              fontFamily: "monospace",
              fontWeight: 500,
            }}
          >
            VOL. VI · MMXXVI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
