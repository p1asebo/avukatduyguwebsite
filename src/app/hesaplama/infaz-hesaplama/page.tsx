"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useExecutionCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Scale, AlertTriangle, Shield } from "lucide-react";

export default function ExecutionCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useExecutionCalculator({
        crimeType: "standard",
        sentenceYears: 0,
        sentenceMonths: 0,
        sentenceDays: 0,
        isRecidivist: false,
        isMinor: false,
        detentionDays: 0,
    });
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    const crimeTypes = [
        { value: "standard", label: "Standart Suç" },
        { value: "terrorism", label: "Terör Suçu" },
        { value: "sexualCrime", label: "Cinsel Suç" },
        { value: "organizedCrime", label: "Örgütlü Suç" },
        { value: "aggravatedLife", label: "Ağırlaştırılmış Müebbet" },
        { value: "life", label: "Müebbet Hapis" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/hesaplama" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    İnfaz (Yatar) Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-4">
                    Koşullu salıverilme ve denetimli serbestlik tarihlerini hesaplayın.
                </p>

                {/* Big Warning */}
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8 flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-amber-800">
                        <strong className="block text-lg">⚠️ TAHMİNİ SİMÜLASYONDUR</strong>
                        <p className="text-sm mt-1">
                            Bu hesaplama yalnızca fikir vermek amaçlıdır. Gerçek infaz süreleri mahkeme kararına,
                            iyi hal indirimlerine ve mevzuat değişikliklerine göre farklılık gösterebilir.
                            Kesin bilgi için avukat danışmanlığı alınız.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Scale className="h-5 w-5 text-blue-600" />
                            Ceza Bilgileri
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Suç Tarihi
                                </label>
                                <input
                                    type="date"
                                    value={input.crimeDate || ""}
                                    onChange={(e) => updateInput({ crimeDate: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Suç Türü
                                </label>
                                <select
                                    value={input.crimeType || "standard"}
                                    onChange={(e) => updateInput({ crimeType: e.target.value as typeof input.crimeType })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {crimeTypes.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Ceza Süresi
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <input
                                            type="number"
                                            min="0"
                                            value={input.sentenceYears ?? 0}
                                            onChange={(e) => updateInput({ sentenceYears: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-xs text-slate-500">Yıl</span>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            min="0"
                                            max="11"
                                            value={input.sentenceMonths ?? 0}
                                            onChange={(e) => updateInput({ sentenceMonths: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-xs text-slate-500">Ay</span>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            min="0"
                                            max="30"
                                            value={input.sentenceDays ?? 0}
                                            onChange={(e) => updateInput({ sentenceDays: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-xs text-slate-500">Gün</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Tutukluluk Süresi (Gün)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.detentionDays ?? 0}
                                    onChange={(e) => updateInput({ detentionDays: parseInt(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={input.isRecidivist || false}
                                        onChange={(e) => updateInput({ isRecidivist: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600"
                                    />
                                    <span className="text-slate-700">Tekerrür (Mükerrer suç) var mı?</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={input.isMinor || false}
                                        onChange={(e) => updateInput({ isMinor: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600"
                                    />
                                    <span className="text-slate-700">Suç tarihinde 18 yaşın altında mıydı?</span>
                                </label>
                            </div>

                            {errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                                    {errors.map((err, i) => <div key={i}>{err}</div>)}
                                </div>
                            )}

                            <Button onClick={handleCalculate} className="w-full" disabled={!autoResult}>
                                Hesapla
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Sonuç</h2>

                        {showResult && autoResult ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-1">Tahmini Net Yatar</div>
                                    <div className="text-3xl font-bold text-blue-700">
                                        {autoResult.breakdown.find(b => b.label === "Net Yatar Süre")?.value}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {autoResult.breakdown.map((item, i) => (
                                        <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                            <span className="text-slate-600">{item.label}</span>
                                            <span className="font-semibold text-slate-900">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {autoResult.appliedRules.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Uygulanan Kurallar
                                        </h3>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            {autoResult.appliedRules.map((rule, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500">•</span>
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bilgilerinizi girip "Hesapla" butonuna tıklayın.</p>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-center">
                    {disclaimer}
                </div>
            </div>
        </div>
    );
}
