"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic imports for recharts components to avoid SSR issues
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const Line = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.Line {...props} />;
      Comp.displayName = "Line";
      return Comp;
    }),
  { ssr: false },
);

const XAxis = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.XAxis {...props} />;
      Comp.displayName = "XAxis";
      return Comp;
    }),
  { ssr: false },
);

const YAxis = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.YAxis {...props} />;
      Comp.displayName = "YAxis";
      return Comp;
    }),
  { ssr: false },
);

const CartesianGrid = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.CartesianGrid {...props} />;
      Comp.displayName = "CartesianGrid";
      return Comp;
    }),
  { ssr: false },
);

const Tooltip = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.Tooltip {...props} />;
      Comp.displayName = "Tooltip";
      return Comp;
    }),
  { ssr: false },
);

const ResponsiveContainer = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.ResponsiveContainer {...props} />;
      Comp.displayName = "ResponsiveContainer";
      return Comp;
    }),
  { ssr: false },
);

const BarChart = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.BarChart {...props} />;
      Comp.displayName = "BarChart";
      return Comp;
    }),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const Bar = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.Bar {...props} />;
      Comp.displayName = "Bar";
      return Comp;
    }),
  { ssr: false },
);

const PieChart = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.PieChart {...props} />;
      Comp.displayName = "PieChart";
      return Comp;
    }),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const Pie = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.Pie {...props} />;
      Comp.displayName = "Pie";
      return Comp;
    }),
  { ssr: false },
);

const Cell = dynamic(
  () =>
    import("recharts").then((mod) => {
      const Comp = (props: any) => <mod.Cell {...props} />;
      Comp.displayName = "Cell";
      return Comp;
    }),
  { ssr: false },
);

function ChartSkeleton() {
  return <Skeleton className="w-full h-full rounded-lg bg-gray-200" />;
}

export {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ChartSkeleton,
};
