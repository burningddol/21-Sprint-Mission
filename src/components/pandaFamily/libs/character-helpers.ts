export type CharacterRole = 'main' | 'peeker' | 'shy' | 'idle';
export type FocusTarget = 'none' | 'email' | 'password' | 'nickname';
export type EyeState = 'open' | 'squint' | 'halfOpen';

export const BODY_TOP = 5;
export const BASE_BODY_HEIGHT = 93;
export const EAR_PAD = 14;
export const FACE_Y = 40;
export const OUTLINE = '#3a3a3a';
export const DARK = '#2a2a2a';

export const LEFT_EYE = { x: 38, y: 40 } as const;
export const RIGHT_EYE = { x: 72, y: 40 } as const;

const MAX_OFFSET = 4.5;
const MAX_TILT = 10;

export const EYE_RADIUS: Record<CharacterRole, number> = {
  main: 13,
  peeker: 12,
  shy: 11,
  idle: 10,
};

export const PUPIL_RADIUS: Record<CharacterRole, number> = {
  main: 6,
  peeker: 5.5,
  shy: 5,
  idle: 4.5,
};

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export interface Geometry {
  bodyBottom: number;
  bodyMidY: number;
  shadowY: number;
  viewH: number;
  faceFollowRatio: number;
  earFollowRatio: number;
}

export function getGeometry(heightRatio: number): Geometry {
  const bodyBottom = BODY_TOP + BASE_BODY_HEIGHT * heightRatio;
  const bodyMidY = BODY_TOP + 50 * heightRatio;
  return {
    bodyBottom,
    bodyMidY,
    shadowY: bodyBottom + 1,
    viewH: Math.ceil(bodyBottom + 4),
    faceFollowRatio: (bodyBottom - FACE_Y) / (bodyBottom - BODY_TOP),
    earFollowRatio: bodyBottom / (bodyBottom - BODY_TOP),
  };
}

export function getBodyPath(bodyBottom: number, bodyMidY: number): string {
  return (
    `M10 ${bodyBottom} ` +
    `C10 ${bodyMidY}, 14 18, 28 ${BODY_TOP + 2} ` +
    `C42 ${BODY_TOP - 9}, 78 ${BODY_TOP - 9}, 92 ${BODY_TOP + 2} ` +
    `C106 18, 110 ${bodyMidY}, 110 ${bodyBottom} Z`
  );
}

export function getEyeState(
  role: CharacterRole,
  focused: boolean,
  password: boolean
): EyeState {
  if (!focused) return 'open';
  switch (role) {
    case 'main':
      return password ? 'squint' : 'open';
    case 'peeker':
      return 'halfOpen';
    case 'shy':
      return password ? 'squint' : 'open';
    case 'idle':
      return 'open';
  }
}

export interface Target {
  dx: number;
  dy: number;
  tilt: number;
}

export function getTarget(
  role: CharacterRole,
  focus: FocusTarget,
  cursorX: number,
  cursorY: number
): Target {
  if (focus === 'none') {
    return {
      dx: clamp(cursorX * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
      dy: clamp(cursorY * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
      tilt: clamp(cursorX * MAX_TILT, -MAX_TILT, MAX_TILT),
    };
  }
  if (focus === 'email') {
    switch (role) {
      case 'main':
        return { dx: MAX_OFFSET * 1.2, dy: -2.3, tilt: 6 };
      case 'peeker':
        return { dx: MAX_OFFSET * 1.1, dy: -1.8, tilt: 3 };
      case 'shy':
        return { dx: MAX_OFFSET * 1, dy: -1.8, tilt: 4 };
      case 'idle':
        return { dx: MAX_OFFSET * 0.8, dy: -1.8, tilt: 5 };
    }
  }
  if (focus === 'nickname') {
    switch (role) {
      case 'main':
        return { dx: MAX_OFFSET * 1.2, dy: -1.6, tilt: 6 };
      case 'peeker':
        return { dx: MAX_OFFSET * 1.1, dy: -1.1, tilt: 3 };
      case 'shy':
        return { dx: MAX_OFFSET * 1, dy: -1.1, tilt: 4 };
      case 'idle':
        return { dx: MAX_OFFSET * 0.8, dy: -1.1, tilt: 5 };
    }
  }
  // password
  switch (role) {
    case 'main':
      return { dx: MAX_OFFSET * 0.8, dy: 0, tilt: 6 };
    case 'peeker':
      return { dx: MAX_OFFSET * 1.1, dy: -1, tilt: -4 };
    case 'shy':
      return { dx: -MAX_OFFSET * 0.6, dy: 1, tilt: -8 };
    case 'idle':
      return { dx: MAX_OFFSET * -0.3, dy: 2, tilt: 2 };
  }
}
