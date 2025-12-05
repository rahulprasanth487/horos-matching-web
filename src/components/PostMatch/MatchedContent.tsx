import { Proportions } from "lucide-react";
import React from "react";
import GaugeComponent from "react-gauge-component";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Pie,
    PieChart,
    Cell,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Line,
    ComposedChart,
    Legend,
} from "recharts";

interface Props {
    matchedResponse: any;
    matchedRef: React.RefObject<HTMLDivElement | null>;
}

const COLORS = ["#4f46e5", "#ec4899", "#10b981", "#f59e0b"];

const MatchedContent: React.FC<Props> = ({ matchedResponse, matchedRef }) => {
    if (!matchedResponse?.report) return null;

    const report = matchedResponse.report;
    const compatibilities = report.compatibility_report;

    const poruthamArray = Object.entries(compatibilities).map(
        ([key, value]: any) => ({
            name: key,
            points: value.points,
            max: value.max_points,
        })
    );

    const radarData = poruthamArray;
    const composedData = poruthamArray;

    const RadarTooltip = ({ active, payload }: any) => {
        if (!active || !payload || !payload.length) return null;

        const item = payload[0].payload; // { name, points, max }

        return (
            <div className="rounded-md bg-white px-3 py-2 shadow text-xs">
                <div className="font-semibold text-purple-700 mb-1">{item.name}</div>
                <div>Current: <span className="font-medium">{item.points}</span></div>
                <div>Max: <span className="font-medium">{item.max}</span></div>
            </div>
        );
    }

    return (
        <div ref={matchedRef} className="w-full flex justify-center mt-10 px-4">
            <div className="w-full max-w-6xl">

                {/* TITLE */}
                <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
                    💞 Matchmaking Compatibility Report
                </h2>

                {/* COUPLE OVERVIEW */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                    <div className="col-span-1 bg-white shadow rounded-2xl px-5 py-4 border border-purple-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-purple-500 mb-1">
                            Boy
                        </p>
                        <p className="text-sm text-gray-600">Nakshatra</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {report.boy_nakshatra}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">Rasi</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {report.boy_rasi}
                        </p>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                        <div className="text-center text-sm text-gray-500">
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                                Match Overview
                            </span>
                            <p className="mt-2 text-xs text-gray-500">
                                Nakshatra &amp; Rasi alignment
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1 bg-white shadow rounded-2xl px-5 py-4 border border-pink-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-pink-500 mb-1">
                            Girl
                        </p>
                        <p className="text-sm text-gray-600">Nakshatra</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {report.girl_nakshatra}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">Rasi</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {report.girl_rasi}
                        </p>
                    </div>
                </div>


                {/* GAUGE + SUMMARY CARD */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg rounded-2xl mb-12 p-3 lg:p-8">
                    <div className="flex flex-col lg:flex-col items-center justify-between gap-12">

                        {/* GAUGE — LEFT SIDE */}
                        {/* GAUGE — LEFT SIDE */}
                        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-5">

                            {/* BIG GAUGE */}
                            <GaugeComponent
                                value={report.percentage}
                                type="semicircle"
                                arc={{
                                    subArcs: [
                                        { limit: 20, color: '#EA4228', showTick: true },
                                        { limit: 40, color: '#F58B19', showTick: true },
                                        { limit: 60, color: '#F5CD19', showTick: true },
                                        { limit: 100, color: '#5BE12C', showTick: true },
                                    ],
                                    width: 0.27,
                                }}
                                pointer={{
                                    type: "needle",
                                    length: 0.95,
                                    animate: true,              // use these instead of `animation` prop
                                    animationDuration: 1500,
                                    animationDelay: 200,
                                }}
                                labels={{ valueLabel: { hide: true } }}   // hide built-in label
                                style={{ width: 380 }}
                            />

                            {/* CUSTOM PERCENTAGE TEXT BELOW */}
                            <div className="mt-4 text-center">
                                <p className="text-4xl font-extrabold text-purple-700">
                                    {report.percentage}%
                                </p>
                                <p className="text-sm text-gray-500 tracking-wide">
                                    Compatibility Score
                                </p>
                            </div>

                        </div>


                        {/* SUMMARY — RIGHT SIDE */}
                        <div className="flex-1 bg-white rounded-2xl shadow-md p-8 border border-purple-100">
                            <h3 className="text-2xl font-bold text-purple-700 mb-4">
                                Overall Summary
                            </h3>

                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {report.overall_summary}
                            </p>

                            {/* Extra badges */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    Score: {report.total_score}/{report.max_score}
                                </span>
                                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Match %: {report.percentage}%
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                {/* CHART GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

                    {/* RADAR */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">
                            Porutham Radar View
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <PolarRadiusAxis />
                                <Radar
                                    name="Current"
                                    dataKey="points"
                                    stroke="#7c3aed"
                                    fill="#7c3aed"
                                    fillOpacity={0.5}
                                />
                                {/* Optional: outline for max scale */}
                                <Radar
                                    name="Max"
                                    dataKey="max"
                                    stroke="#c4b5fd"
                                    fillOpacity={0}
                                />
                                <Tooltip content={<RadarTooltip />} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>

                    </div>

                    {/* BAR + LINE */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">
                            Porutham Points (Bar + Line)
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <ComposedChart data={composedData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="points" barSize={26} fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                <Line type="monotone" dataKey="max" stroke="#ec4899" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE CHART */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-12 flex justify-center">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">
                            Strength vs Remaining Distribution
                        </h3>
                        <ResponsiveContainer width={380} height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Scored", value: report.total_score },
                                        { name: "Remaining", value: report.max_score - report.total_score },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                                    }
                                >
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f97316" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* TABLE */}
                {/* TABLE */}
                <div className="mb-20">
                    {/* MOBILE CARD VIEW (<= md) */}
                    <div className="block md:hidden space-y-4">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">
                            Detailed Porutham Breakdown
                        </h3>

                        {/* small summary */}
                        <div className="mb-2 text-sm text-gray-700">
                            <span className="font-semibold text-purple-700">
                                Total: {report.total_score}/{report.max_score}
                            </span>
                            <span className="ml-2 text-gray-500">
                                ({report.percentage}% overall)
                            </span>
                        </div>

                        {poruthamArray.map((item) => {
                            const value = compatibilities[item.name];
                            return (
                                <div
                                    key={item.name}
                                    className="border border-gray-200 rounded-xl shadow-sm bg-white"
                                >
                                    <div className="px-4 py-3 border-b bg-purple-50 rounded-t-xl flex items-center justify-between">
                                        <p className="text-sm font-semibold text-purple-700">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {value.points}/{value.max_points}
                                        </p>
                                    </div>

                                    <div className="px-4 py-3 space-y-1 text-sm">
                                        <p>
                                            <span className="font-medium text-gray-600">Rating: </span>
                                            <span className="text-gray-800">{value.rating}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-600">Points: </span>
                                            <span className="text-gray-800">
                                                {value.points}/{value.max_points}
                                            </span>
                                        </p>
                                        <p className="pt-1">
                                            <span className="font-medium text-gray-600">Explanation: </span>
                                            <span className="text-gray-800">{value.explanation}</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* DESKTOP TABLE VIEW (>= md) */}
                    <div className="hidden md:block overflow-x-auto">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">
                            Detailed Porutham Breakdown
                        </h3>

                        {/* summary above table */}
                        <div className="mb-3 text-sm text-gray-700">
                            <span className="font-semibold text-purple-700">
                                Total Score: {report.total_score}/{report.max_score}
                            </span>
                            <span className="ml-2 text-gray-500">
                                Overall Compatibility: {report.percentage}%
                            </span>
                        </div>

                        <table className="min-w-full text-sm text-left border-collapse table-auto">
                            <thead>
                                <tr className="bg-purple-50 text-gray-700">
                                    <th className="px-4 py-2 font-semibold w-40">Porutham</th>
                                    <th className="px-4 py-2 font-semibold w-28">Rating</th>
                                    <th className="px-4 py-2 font-semibold w-28 text-right">
                                        Points
                                    </th>
                                    <th className="px-4 py-2 font-semibold">Explanation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poruthamArray.map((item, idx) => {
                                    const value = compatibilities[item.name];
                                    return (
                                        <tr
                                            key={item.name}
                                            className={
                                                (idx % 2 === 0 ? "bg-white" : "bg-gray-50") +
                                                " border-b last:border-0"
                                            }
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700">
                                                {value.rating}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 text-right">
                                                {value.points}/{value.max_points}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {value.explanation}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                            {/* totals row */}
                            <tfoot>
                                <tr className="bg-purple-50 border-t">
                                    <td className="px-4 py-2 font-semibold text-purple-700">
                                        Total
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        Overall
                                    </td>
                                    <td className="px-4 py-2 font-semibold text-right text-purple-700">
                                        {report.total_score}/{report.max_score}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        Overall compatibility {report.percentage}% based on all
                                        poruthams.
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>



            </div>
        </div>
    );

};

export default MatchedContent;
