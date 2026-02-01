import styled from 'styled-components';
import {
  type CharacterRole,
  type FocusTarget,
  type EyeState,
  EAR_PAD,
  LEFT_EYE,
  RIGHT_EYE,
  OUTLINE,
  DARK,
  EYE_RADIUS,
  PUPIL_RADIUS,
  getGeometry,
  getBodyPath,
  getEyeState,
} from './libs/character-helpers';
import { useCharacterAnimation } from './libs/useCharacterAnimation';

const Wrapper = styled.div`
  position: relative;
`;

export type { CharacterRole, FocusTarget };

interface CharacterProps {
  cursorX: number;
  cursorY: number;
  focusTarget: FocusTarget;
  isTyping: boolean;
  role: CharacterRole;
  scale?: number;
  accentColor?: string;
  heightRatio?: number;
  zIndex?: number;
}

/* ── Sub-components ─────────────────────────────── */

function Eye({
  side,
  state,
  pupilRef,
  highlightRef,
  eyeR,
  pupilR,
}: {
  side: 'left' | 'right';
  state: EyeState;
  pupilRef: React.RefObject<SVGCircleElement | null>;
  highlightRef: React.RefObject<SVGCircleElement | null>;
  eyeR: number;
  pupilR: number;
}) {
  const c = side === 'left' ? LEFT_EYE : RIGHT_EYE;

  if (state === 'squint') {
    return (
      <path
        d={`M${c.x - 9} ${c.y} Q${c.x} ${c.y + 6}, ${c.x + 9} ${c.y}`}
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  if (state === 'halfOpen') {
    const wide = side === 'right';
    const rx = eyeR * (wide ? 0.85 : 0.8);
    const ry = eyeR * (wide ? 0.45 : 0.35);
    const pr = pupilR * (wide ? 0.75 : 0.7);
    return (
      <>
        <ellipse
          cx={c.x}
          cy={c.y}
          rx={rx}
          ry={ry}
          fill="white"
          stroke={OUTLINE}
          strokeWidth="2"
        />
        <circle
          ref={pupilRef}
          cx={c.x + (wide ? 2 : 0)}
          cy={c.y}
          r={pr}
          fill={DARK}
        />
        <circle
          ref={highlightRef}
          cx={c.x + 1.5}
          cy={c.y - 1}
          r={1.8}
          fill="white"
        />
      </>
    );
  }

  // open (default)
  return (
    <>
      <circle
        cx={c.x}
        cy={c.y}
        r={eyeR}
        fill="white"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <circle ref={pupilRef} cx={c.x} cy={c.y} r={pupilR} fill={DARK} />
      <circle
        ref={highlightRef}
        cx={c.x + 2.2}
        cy={c.y - 2.8}
        r={2.4}
        fill="white"
      />
    </>
  );
}

function Mouth({ role, focused }: { role: CharacterRole; focused: boolean }) {
  if (role === 'main' && focused) {
    return <ellipse cx="55" cy="64" rx="3.5" ry="2.8" fill={OUTLINE} />;
  }
  if (role === 'peeker' && focused) {
    return (
      <path
        d="M50 63 Q56 67, 62 63"
        stroke={OUTLINE}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }
  return (
    <path
      d="M48 63 Q55 69, 65 63"
      stroke={OUTLINE}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  );
}

/* ── Main component ─────────────────────────────── */

export default function Character({
  cursorX,
  cursorY,
  focusTarget,
  isTyping,
  role,
  scale = 1,
  accentColor = 'white',
  heightRatio = 1,
  zIndex = 0,
}: CharacterProps) {
  const geo = getGeometry(heightRatio);
  const { body, face, ears, pupils, highlights } = useCharacterAnimation({
    cursorX,
    cursorY,
    focusTarget,
    isTyping,
    role,
    geo,
  });

  const focused = focusTarget !== 'none';
  const eyeState = getEyeState(role, focused, focusTarget === 'password');
  const eyeR = EYE_RADIUS[role];
  const pupilR = PUPIL_RADIUS[role];
  const w = 120 * scale;
  const h = (geo.viewH + EAR_PAD) * scale;

  return (
    <Wrapper style={{ width: w, height: h, zIndex }}>
      <svg
        viewBox={`0 ${-EAR_PAD} 120 ${geo.viewH + EAR_PAD}`}
        width={w}
        height={h}
        fill="none"
      >
        {/* Shadow */}
        <ellipse
          cx="60"
          cy={geo.shadowY}
          rx="46"
          ry="5"
          fill="rgba(0,0,0,0.07)"
        />

        {/* Ears */}
        <g ref={ears}>
          <g>
            <circle cx={35} cy={0} r={10} fill={DARK} />
            <circle cx={35} cy={0} r={7} fill={accentColor} />
          </g>
          <g>
            <circle cx={85} cy={0} r={10} fill={DARK} />
            <circle cx={85} cy={0} r={7} fill={accentColor} />
          </g>
        </g>

        {/* Body */}
        <path
          ref={body}
          d={getBodyPath(geo.bodyBottom, geo.bodyMidY)}
          fill={role === 'peeker' ? '#f5f2f2' : 'white'}
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Face */}
        <g ref={face}>
          {/* Eye sockets */}
          <ellipse
            cx={LEFT_EYE.x}
            cy={LEFT_EYE.y}
            rx={eyeR + 2.5}
            ry={eyeR + 3.5}
            fill={DARK}
          />
          <ellipse
            cx={RIGHT_EYE.x}
            cy={RIGHT_EYE.y}
            rx={eyeR + 2.5}
            ry={eyeR + 3.5}
            fill={DARK}
          />

          {/* Eyes */}
          <Eye
            side="left"
            state={eyeState}
            pupilRef={pupils.left}
            highlightRef={highlights.left}
            eyeR={eyeR}
            pupilR={pupilR}
          />
          <Eye
            side="right"
            state={eyeState}
            pupilRef={pupils.right}
            highlightRef={highlights.right}
            eyeR={eyeR}
            pupilR={pupilR}
          />

          {/* Nose */}
          <ellipse cx={55} cy={56} rx={3} ry={2.2} fill={DARK} />
          <line
            x1={55}
            y1={58}
            x2={55}
            y2={62}
            stroke={DARK}
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Mouth */}
          <Mouth role={role} focused={focused} />

          {/* Cheek blush */}
          {focused && (
            <>
              <ellipse
                cx={24}
                cy={54}
                rx={7}
                ry={4}
                fill="#ffcdd7f4"
                opacity={0.6}
              />
              <ellipse
                cx={86}
                cy={54}
                rx={7}
                ry={4}
                fill="#ffcdd7f4"
                opacity={0.6}
              />
            </>
          )}
        </g>
      </svg>
    </Wrapper>
  );
}
