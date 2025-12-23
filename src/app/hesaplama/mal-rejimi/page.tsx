"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePropertyRegimeCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Home, Plus, Trash2, AlertTriangle } from "lucide-react";

interface Asset {
    name: string;
    value: number;
}

export default function PropertyRegimeCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = usePropertyRegimeCalculator();
    const [showResult, setShowResult] = useState(false);

    // Local state for asset management
    const [spouse1Personal, setSpouse1Personal] = useState<Asset[]>([]);
    const [spouse1Acquired, setSpouse1Acquired] = useState<Asset[]>([]);
    const [spouse2Personal, setSpouse2Personal] = useState<Asset[]>([]);
    const [spouse2Acquired, setSpouse2Acquired] = useState<Asset[]>([]);

    const [newAsset, setNewAsset] = useState({ name: "", value: 0 });

    const addAsset = (target: "s1p" | "s1a" | "s2p" | "s2a") => {
        if (!newAsset.name || newAsset.value <= 0) return;

        const asset = { ...newAsset };
        switch (target) {
            case "s1p":
                setSpouse1Personal([...spouse1Personal, asset]);
                updateInput({ spouse1PersonalAssets: [...spouse1Personal, asset] });
                break;
            case "s1a":
                setSpouse1Acquired([...spouse1Acquired, asset]);
                updateInput({ spouse1AcquiredAssets: [...spouse1Acquired, asset] });
                break;
            case "s2p":
                setSpouse2Personal([...spouse2Personal, asset]);
                updateInput({ spouse2PersonalAssets: [...spouse2Personal, asset] });
                break;
            case "s2a":
                setSpouse2Acquired([...spouse2Acquired, asset]);
                updateInput({ spouse2AcquiredAssets: [...spouse2Acquired, asset] });
                break;
        }
        setNewAsset({ name: "", value: 0 });
    };

    const removeAsset = (target: "s1p" | "s1a" | "s2p" | "s2a", index: number) => {
        switch (target) {
            case "s1p":
                const s1p = spouse1Personal.filter((_, i) => i !== index);
                setSpouse1Personal(s1p);
                updateInput({ spouse1PersonalAssets: s1p });
                break;
            case "s1a":
                const s1a = spouse1Acquired.filter((_, i) => i !== index);
                setSpouse1Acquired(s1a);
                updateInput({ spouse1AcquiredAssets: s1a });
                break;
            case "s2p":
                const s2p = spouse2Personal.filter((_, i) => i !== index);
                setSpouse2Personal(s2p);
                updateInput({ spouse2PersonalAssets: s2p });
                break;
            case "s2a":
                const s2a = spouse2Acquired.filter((_, i) => i !== index);
                setSpouse2Acquired(s2a);
                updateInput({ spouse2AcquiredAssets: s2a });
                break;
        }
    };

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    const AssetList = ({ assets, target }: { assets: Asset[]; target: "s1p" | "s1a" | "s2p" | "s2a" }) => (
        <div className="space-y-2">
            {assets.map((asset, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg p-2">
                    <div>
                        <span className="font-medium text-slate-900">{asset.name}</span>
                        <span className="text-slate-500 ml-2">{asset.value.toLocaleString("tr-TR")} TL</span>
                    </div>
                    <button
                        onClick={() => removeAsset(target, i)}
                        className="text-red-500 hover:text-red-700 p-1"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ))}
            {assets.length === 0 && (
                <div className="text-sm text-slate-400 text-center py-2">Henüz mal eklenmedi</div>
            )}
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link href="/hesaplama" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    Mal Rejimi Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-4">
                    Edinilmiş mallara katılma rejiminde katılma alacağı simülasyonu.
                </p>

                {/* Big Warning */}
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8 flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-amber-800">
                        <strong className="block text-lg">⚠️ TAHMİNİ SİMÜLASYONDUR</strong>
                        <p className="text-sm mt-1">
                            Mal rejimi hesaplamaları birçok değişkene bağlıdır. Kişisel mal / edinilmiş mal ayrımı,
                            değer artışları ve denkleştirme hesapları karmaşık olabilir. Kesin sonuç için avukat danışmanlığı gereklidir.
                        </p>
                    </div>
                </div>

                {/* Date Inputs */}
                <Card className="p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Evlilik Tarihi
                            </label>
                            <input
                                type="date"
                                value={input.marriageDate || ""}
                                onChange={(e) => updateInput({ marriageDate: e.target.value })}
                                className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Ayrılık Tarihi (Boş = Bugün)
                            </label>
                            <input
                                type="date"
                                value={input.separationDate || ""}
                                onChange={(e) => updateInput({ separationDate: e.target.value || undefined })}
                                className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </Card>

                {/* Two Columns for Spouses */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Spouse 1 */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Home className="h-5 w-5 text-blue-600" />
                            Eş 1 (Talep Eden)
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Kişisel Mallar</h3>
                                <p className="text-xs text-slate-500 mb-2">Evlilik öncesi veya miras/bağış yoluyla edinilen mallar</p>
                                <AssetList assets={spouse1Personal} target="s1p" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Edinilmiş Mallar</h3>
                                <p className="text-xs text-slate-500 mb-2">Evlilik süresince emek karşılığı edinilen mallar</p>
                                <AssetList assets={spouse1Acquired} target="s1a" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Borçlar (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.spouse1Debts || ""}
                                    onChange={(e) => updateInput({ spouse1Debts: parseFloat(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Spouse 2 */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Home className="h-5 w-5 text-purple-600" />
                            Eş 2 (Karşı Taraf)
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Kişisel Mallar</h3>
                                <p className="text-xs text-slate-500 mb-2">Evlilik öncesi veya miras/bağış yoluyla edinilen mallar</p>
                                <AssetList assets={spouse2Personal} target="s2p" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Edinilmiş Mallar</h3>
                                <p className="text-xs text-slate-500 mb-2">Evlilik süresince emek karşılığı edinilen mallar</p>
                                <AssetList assets={spouse2Acquired} target="s2a" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Borçlar (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.spouse2Debts || ""}
                                    onChange={(e) => updateInput({ spouse2Debts: parseFloat(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Add Asset Form */}
                <Card className="p-6 mb-8">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Yeni Mal Ekle
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Mal Adı (Örn: Ev, Araba)"
                            value={newAsset.name}
                            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                            className="rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Değer (TL)"
                            value={newAsset.value || ""}
                            onChange={(e) => setNewAsset({ ...newAsset, value: parseFloat(e.target.value) || 0 })}
                            className="rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            id="asset-target"
                            className="rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="s1p">Eş 1 - Kişisel</option>
                            <option value="s1a">Eş 1 - Edinilmiş</option>
                            <option value="s2p">Eş 2 - Kişisel</option>
                            <option value="s2a">Eş 2 - Edinilmiş</option>
                        </select>
                        <Button
                            onClick={() => {
                                const select = document.getElementById("asset-target") as HTMLSelectElement;
                                addAsset(select.value as "s1p" | "s1a" | "s2p" | "s2a");
                            }}
                        >
                            Ekle
                        </Button>
                    </div>
                </Card>

                <div className="text-center mb-8">
                    <Button onClick={handleCalculate} className="px-12" disabled={!autoResult}>
                        Simülasyonu Başlat
                    </Button>
                </div>

                {/* Result */}
                {showResult && autoResult && (
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Simülasyon Sonucu</h2>

                        <div className={`rounded-xl p-6 text-center mb-6 ${autoResult.creditor === "spouse1" ? "bg-blue-50" :
                                autoResult.creditor === "spouse2" ? "bg-purple-50" : "bg-slate-100"
                            }`}>
                            <div className="text-sm font-semibold mb-1">
                                {autoResult.creditor === "spouse1" ? "Eş 1'e Ödenecek Katılma Alacağı" :
                                    autoResult.creditor === "spouse2" ? "Eş 2'ye Ödenecek Katılma Alacağı" :
                                        "Karşılıklı Alacak Yok"}
                            </div>
                            <div className="text-4xl font-bold">
                                {autoResult.amountToPay.toLocaleString("tr-TR")} TL
                            </div>
                        </div>

                        <p className="text-slate-600 text-center mb-6">{autoResult.explanation}</p>

                        {/* Breakdown Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2"></th>
                                        <th className="text-right py-2 text-blue-600">Eş 1</th>
                                        <th className="text-right py-2 text-purple-600">Eş 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {autoResult.breakdown.map((row, i) => (
                                        <tr key={i} className="border-b last:border-0">
                                            <td className="py-3 text-slate-700">{row.label}</td>
                                            <td className="py-3 text-right font-medium">
                                                {row.spouse1.toLocaleString("tr-TR")} TL
                                            </td>
                                            <td className="py-3 text-right font-medium">
                                                {row.spouse2.toLocaleString("tr-TR")} TL
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-center">
                    {disclaimer}
                </div>
            </div>
        </div>
    );
}
