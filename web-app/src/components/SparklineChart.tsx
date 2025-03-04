'use client';

import React, { useEffect, useRef } from 'react';

interface SparklineChartProps {
    data: number[];
    width?: number;
    height?: number;
    lineColor?: string;
    lineWidth?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({
    data,
    width = 120,
    height = 40,
    lineColor,
    lineWidth = 1.5,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isPositive = data.length > 1 ? data[data.length - 1] > data[0] : true;
    const defaultColor = isPositive ? '#10B981' : '#EF4444'; // green for positive, red for negative
    const color = lineColor || defaultColor;

    useEffect(() => {
        if (!canvasRef.current || !data || data.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Find min and max values for scaling
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        const range = maxValue - minValue || 1; // Avoid division by zero

        // Draw the sparkline
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round';

        // Calculate step size
        const step = width / (data.length - 1);

        // Draw the line
        data.forEach((value, index) => {
            // Scale the value to fit the canvas height
            const scaledValue = height - ((value - minValue) / range) * height;
            const x = index * step;

            if (index === 0) {
                ctx.moveTo(x, scaledValue);
            } else {
                ctx.lineTo(x, scaledValue);
            }
        });

        ctx.stroke();
    }, [data, width, height, color, lineWidth]);

    if (!data || data.length === 0) {
        return <div className="w-full h-full flex items-center justify-center text-gray-400">No data</div>;
    }

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="inline-block"
        />
    );
};

export default SparklineChart; 