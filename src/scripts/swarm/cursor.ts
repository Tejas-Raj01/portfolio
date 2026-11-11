// Canvas Cursor Renderer: Multi-player Cursors, Nametags & Drafting Tools

import type { Boid } from './boids';

export function renderCursor(ctx: CanvasRenderingContext2D, boid: Boid): void {
  const x = Math.round(boid.pos.x);
  const y = Math.round(boid.pos.y);

  ctx.save();
  ctx.translate(x, y);

  // 1. Tool Specific Cursor Head
  if (boid.tool === 'crosshair') {
    // Crosshair for Box Dragging
    ctx.strokeStyle = boid.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.moveTo(-9, 0); ctx.lineTo(-3, 0);
    ctx.moveTo(3, 0); ctx.lineTo(9, 0);
    ctx.moveTo(0, -9); ctx.lineTo(0, -3);
    ctx.moveTo(0, 3); ctx.lineTo(0, 9);
    ctx.stroke();
  } else if (boid.tool === 'ibeam') {
    // I-Beam for Text Editing
    ctx.strokeStyle = boid.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-4, -7); ctx.lineTo(4, -7);
    ctx.moveTo(0, -7); ctx.lineTo(0, 7);
    ctx.moveTo(-4, 7); ctx.lineTo(4, 7);
    ctx.stroke();
  } else if (boid.tool === 'pen') {
    // Vector Pen Tool for Line Drawing
    ctx.strokeStyle = boid.color;
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 4);
    ctx.lineTo(6, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Pen nib
    ctx.fillStyle = boid.color;
    ctx.fillRect(-1, -1, 3, 3);
  } else {
    // Standard Crisp Arrow Pointer
    ctx.fillStyle = boid.color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 15);
    ctx.lineTo(4, 11);
    ctx.lineTo(8, 18);
    ctx.lineTo(10, 17);
    ctx.lineTo(6, 10);
    ctx.lineTo(11, 10);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }

  // 2. Nametag Pill (Commit Mono, 10px)
  const tagText = boid.name;
  ctx.font = '10px "Commit Mono", monospace';
  const textMetrics = ctx.measureText(tagText);
  const tagWidth = textMetrics.width + 10;
  const tagHeight = 16;
  const tagX = 14;
  const tagY = 8;

  // Background tag pill
  ctx.fillStyle = boid.color;
  ctx.fillRect(tagX, tagY, tagWidth, tagHeight);

  // Tag Text (clean white text with high contrast)
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(tagText, tagX + 5, tagY + tagHeight / 2 + 0.5);

  ctx.restore();

  // 3. Drafting Overlays: Drag Bounding Box & W x H Badge
  if (boid.isDragging && boid.dragStart) {
    const sx = Math.min(boid.dragStart.x, boid.pos.x);
    const sy = Math.min(boid.dragStart.y, boid.pos.y);
    const sw = Math.abs(boid.pos.x - boid.dragStart.x);
    const sh = Math.abs(boid.pos.y - boid.dragStart.y);

    if (sw > 4 && sh > 4) {
      ctx.save();
      ctx.strokeStyle = boid.color;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, sy, sw, sh);

      // Subtle fill
      ctx.fillStyle = 'rgba(196, 67, 43, 0.05)';
      ctx.fillRect(sx, sy, sw, sh);

      // W x H Badge
      const dimText = `${Math.round(sw)} × ${Math.round(sh)}`;
      ctx.font = '9px "Commit Mono", monospace';
      ctx.setLineDash([]);
      ctx.fillStyle = boid.color;
      ctx.fillRect(sx, sy - 14, ctx.measureText(dimText).width + 8, 14);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(dimText, sx + 4, sy - 4);
      ctx.restore();
    }
  }
}
