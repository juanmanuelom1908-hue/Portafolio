import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { POSITIONS } from "../types/player";
import { defaultPlayer } from "../data/defaultPlayer";
import { PlayerCard, getPlayerTier } from "./PlayerCard";
const STORAGE_KEY = "football_player_card";
function loadPlayer() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return {
                ...defaultPlayer,
                ...JSON.parse(saved),
            };
        }
    }
    catch (error) {
        console.error("Failed to load player data, using defaults:", error);
    }
    return defaultPlayer;
}
export function FootballPlayerCard() {
    const [player, setPlayer] = useState(loadPlayer);
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
        }
        catch (error) {
            console.error("Failed to save player data:", error);
        }
    }, [player]);
    return (_jsxs("div", { className: "page", children: [_jsx("header", { className: "header", children: _jsxs("div", { className: "header-inner", children: [_jsx("p", { className: "header-title", children: "Football Card Builder" }), _jsx("p", { className: "header-subtitle", children: "Customize your player card" })] }) }), _jsx("main", { className: "main", children: _jsxs("div", { className: "layout", children: [_jsxs("div", { className: "form-panel", children: [_jsxs("div", { children: [_jsx("p", { className: "form-section-title", children: "Player Info" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", className: "input", type: "text", value: player.name, onChange: (e) => setPlayer({
                                                        ...player,
                                                        name: e.target.value,
                                                    }) })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "position", children: "Position" }), _jsx("select", { id: "position", className: "input", value: player.position, onChange: (e) => setPlayer({
                                                                ...player,
                                                                position: e.target.value,
                                                            }), children: POSITIONS.map((position) => (_jsx("option", { value: position, children: position }, position))) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "overallRating", children: "Overall" }), _jsx("input", { id: "overallRating", className: "input", type: "number", value: player.overallRating, onChange: (e) => setPlayer({
                                                                ...player,
                                                                overallRating: Number(e.target.value),
                                                            }) })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "club", children: "Club" }), _jsx("input", { id: "club", className: "input", type: "text", value: player.club, onChange: (e) => setPlayer({
                                                        ...player,
                                                        club: e.target.value,
                                                    }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "imageUrl", children: "Image URL" }), _jsx("input", { id: "imageUrl", className: "input", type: "text", value: player.imageUrl, onChange: (e) => setPlayer({
                                                        ...player,
                                                        imageUrl: e.target.value,
                                                    }) })] })] }), _jsxs("div", { children: [_jsx("p", { className: "form-section-title", children: "Player Stats" }), _jsxs("div", { className: "stats-grid", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "pac", children: "PAC" }), _jsx("input", { id: "pac", className: "input", type: "number", value: player.pac, onChange: (e) => setPlayer({
                                                                ...player,
                                                                pac: Number(e.target.value),
                                                            }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "sho", children: "SHO" }), _jsx("input", { id: "sho", className: "input", type: "number", value: player.sho, onChange: (e) => setPlayer({
                                                                ...player,
                                                                sho: Number(e.target.value),
                                                            }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "pas", children: "PAS" }), _jsx("input", { id: "pas", className: "input", type: "number", value: player.pas, onChange: (e) => setPlayer({
                                                                ...player,
                                                                pas: Number(e.target.value),
                                                            }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "dri", children: "DRI" }), _jsx("input", { id: "dri", className: "input", type: "number", value: player.dri, onChange: (e) => setPlayer({
                                                                ...player,
                                                                dri: Number(e.target.value),
                                                            }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "def", children: "DEF" }), _jsx("input", { id: "def", className: "input", type: "number", value: player.def, onChange: (e) => setPlayer({
                                                                ...player,
                                                                def: Number(e.target.value),
                                                            }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "label", htmlFor: "phy", children: "PHY" }), _jsx("input", { id: "phy", className: "input", type: "number", value: player.phy, onChange: (e) => setPlayer({
                                                                ...player,
                                                                phy: Number(e.target.value),
                                                            }) })] })] })] })] }), _jsxs("div", { className: "preview-panel", children: [_jsx("p", { className: "preview-label", children: "Live Preview" }), _jsx("p", { className: "preview-hint", children: "Updates as you type" }), _jsx("div", { className: `preview-box tier-${getPlayerTier(player.overallRating)}`, children: _jsx(PlayerCard, { player: player }) })] })] }) })] }));
}
//# sourceMappingURL=FootballPlayerCard.js.map