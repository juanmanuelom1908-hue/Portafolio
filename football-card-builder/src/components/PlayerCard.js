import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function getPlayerTier(rating) {
    if (rating >= 92)
        return "elite";
    if (rating >= 85)
        return "gold";
    if (rating >= 75)
        return "silver";
    return "bronze";
}
export function PlayerCard({ player }) {
    return (_jsx("div", { className: `card-wrapper tier-${getPlayerTier(player.overallRating)}`, children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsxs("div", { children: [_jsx("div", { className: "card-rating", children: player.overallRating }), _jsx("div", { className: "card-position", children: player.position })] }), _jsxs("div", { className: "card-header-right", children: [_jsx("div", { className: "card-tier-badge", children: getPlayerTier(player.overallRating).toUpperCase() }), _jsx("div", { className: "card-club", children: player.club })] })] }), _jsx("div", { className: "card-image-wrap", children: _jsx("img", { src: player.imageUrl, alt: `${player.name} headshot`, className: "card-image" }) }), _jsx("div", { className: "card-name-strip", children: _jsx("span", { className: "card-name", children: player.name }) }), _jsxs("div", { className: "card-stats", children: [_jsxs("div", { className: "stat-col", children: [_jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.pac }), _jsx("span", { className: "stat-label", children: "PAC" })] }), _jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.sho }), _jsx("span", { className: "stat-label", children: "SHO" })] }), _jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.pas }), _jsx("span", { className: "stat-label", children: "PAS" })] })] }), _jsx("div", { className: "stat-divider" }), _jsxs("div", { className: "stat-col", children: [_jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.dri }), _jsx("span", { className: "stat-label", children: "DRI" })] }), _jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.def }), _jsx("span", { className: "stat-label", children: "DEF" })] }), _jsxs("div", { className: "stat-row", children: [_jsx("span", { className: "stat-value", children: player.phy }), _jsx("span", { className: "stat-label", children: "PHY" })] })] })] })] }) }));
}
//# sourceMappingURL=PlayerCard.js.map